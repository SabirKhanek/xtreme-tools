"use server";
import prisma from "@/app/shared/prisma";
import { stripe } from "./stripe";
import Stripe from "stripe";
import { subscription_plans } from "@prisma/client";
import { AuthGuard } from "../../shared";

export async function getStripeCustomerFromEmail(email: string) {
  const user = await prisma.user.findUnique({ where: { email: email } });
  if (!user) throw new Error(`no user found with email: ${email}`);
  const customer_id = user?.stripe_customer_id;

  const customer_from_stripe = (
    await stripe.customers.list({ email: email })
  ).data.at(0);

  let stripe_new_customer: Stripe.Customer | undefined;
  if (!customer_from_stripe) {
    stripe_new_customer = await stripe.customers.create({
      name: user.first_name!,
      email: email,
    });
  } else {
    stripe_new_customer = customer_from_stripe;
  }
  await prisma.user.update({
    data: { stripe_customer_id: stripe_new_customer.id },
    where: { email },
  });
  return stripe_new_customer!;
}

// Function to retrieve or create the price ID for a subscription plan
export async function getPriceId(
  subscription_plan: subscription_plans
): Promise<{ price_id: string }> {
  const auth_guard = AuthGuard();

  console.log("Getting price ID for subscription plan:", subscription_plan.id);
  let prod_id = subscription_plan.id;
  let prod_obj: Stripe.Product | undefined;
  let price_id;
  let isProdCreated = false;

  // price data
  const priceData = {
    currency: "usd",
    unit_amount: subscription_plan.original_price,
    recurring: {
      interval: (subscription_plan.subscription_interval === "yearly"
        ? "year"
        : "month") as "year" | "month",
    },
  };

  const createStripeProduct = async () => {
    console.log("Creating new Stripe product for plan:", subscription_plan.id);
    const new_prod = await stripe.products.create({
      name: subscription_plan.name || subscription_plan.id,
      description: `Xtreme tool's ${subscription_plan.name} subscription plan.`,
      metadata: { plan_id: subscription_plan.id }, // store subscription_plan_id in the meta data to access in webhooks
      active: subscription_plan.status === "active",
      default_price_data: priceData,
      id: subscription_plan.id, // overrided to keep stripe_prod_id=subscription_plan_id
    });
    prod_id = new_prod.id;
    prod_obj = new_prod;
    isProdCreated = true;
    await prisma.subscription_plans.update({
      data: { stripe_product_id: new_prod.id },
      where: { id: subscription_plan.id },
    });
    console.log("Created new Stripe product:", new_prod.id);
  };

  if (!prod_obj) {
    console.log("Fetching product from Stripe with ID:", prod_id);
    prod_obj = (await stripe.products.list({ ids: [prod_id!] })).data.at(0);
    if (prod_obj && !prod_obj.active) {
      prod_obj = await stripe.products.update(prod_obj.id, { active: true });
    }
    if (!prod_obj) {
      console.log(
        "No product found with ID:",
        prod_id,
        "Creating a new product"
      );
      await createStripeProduct();
    } else {
      console.log("Found product:", prod_obj.id);
    }
  }

  price_id = prod_obj?.default_price;
  let newPriceCreated = false;

  if (!price_id) {
    console.log("No default price data for the product creating default price");
    const new_price = await stripe.prices.create({
      ...priceData,
      product: prod_id!,
    });
    await stripe.products.update(prod_id!, { default_price: new_price.id });
    price_id = new_price.id;
  }

  // ensuring price data synced with stripe
  if (!isProdCreated && !newPriceCreated) {
    console.log(
      "Ensuring price data is synced with Stripe for price ID:",
      price_id
    );
    let price = await stripe.prices.retrieve((price_id as string) || "");
    if (price.unit_amount !== priceData.unit_amount) {
      console.log(
        "Price data mismatch, creating new price with data:",
        priceData
      );
      price = await stripe.prices.create({ ...priceData, product: prod_id! });
      let old_price = price_id;
      price_id = price.id;

      console.log(
        `Updating the default price of prod=[${prod_id}] to price=[${price.id}]`
      );
      await stripe.products.update(prod_id!, { default_price: price.id });

      // deactivating old price
      await stripe.prices.update(old_price as string, { active: false });
      console.log("Deactivated old price ID:", old_price);
    } else {
      console.log("Price data is already up-to-date");
    }
  }

  console.log("Final price ID:", price_id);
  return { price_id: price_id as string };
}
