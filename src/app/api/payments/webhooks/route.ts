import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "../utils/stripe";
import prisma from "@/app/shared/prisma";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

const constructStripeEvent = (
  buf: string,
  sig: string,
  secret: string
): Stripe.Event => {
  try {
    console.log("🔍 Constructing Stripe event...");
    return stripe.webhooks.constructEvent(buf, sig, secret);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.log(`❌ Error constructing event: ${errorMessage}`);
    throw new Error(`Webhook Error: ${errorMessage}`);
  }
};

const fetchPlanFromStripeProduct = async (product: Stripe.Product) => {
  try {
    console.log(`🔍 Fetching plan for product ${product.id}...`);
    return await prisma.subscription_plans.findFirstOrThrow({
      where: {
        OR: [
          { id: product.id },
          { id: product.metadata?.plan_id || product.id },
          { stripe_product_id: product.id },
        ],
      },
    });
  } catch (err) {
    console.log(`❌ Error fetching plan for product ${product.id}: ${err}`);
    throw new Error(`couldn't fetch plan associated with: ${product.id}`);
  }
};

const handleCustomerDeleted = async (customerEmail: string | null) => {
  console.log(`🔍 Handling customer deleted for email: ${customerEmail}`);
  if (customerEmail) {
    await prisma.user.update({
      data: { stripe_customer_id: null },
      where: { email: customerEmail },
    });
    console.log(
      `✅ Successfully handled customer deletion for email: ${customerEmail}`
    );
  } else {
    console.log(`⚠️ No customer email provided for deletion.`);
  }
};

const handleCustomerCreated = async (
  customer_id: string,
  customer_email: string | null
) => {
  console.log(
    `🔍 Handling customer created for ID: ${customer_id}, Email: ${customer_email}`
  );
  if (customer_id && customer_email) {
    await prisma.user.update({
      data: { stripe_customer_id: customer_id },
      where: { email: customer_email },
    });
    console.log(
      `✅ Successfully handled customer creation for ID: ${customer_id}, Email: ${customer_email}`
    );
  } else {
    console.log(`⚠️ Customer ID or email missing for creation.`);
  }
};

const updateUserPlan = async (
  customerId: string,
  planId: string,
  planExpiry: Date | null = null,
  subscription_id: string | null = null
) => {
  console.log(
    `🔍 Updating user plan for customer ${customerId} to plan ${planId} with expiry ${planExpiry}`
  );
  await prisma.user.updateMany({
    data: {
      user_plan: planId,
      user_plan_expiry: planExpiry,
      stripe_subscription_id: subscription_id,
    },
    where: { stripe_customer_id: customerId },
  });
  console.log(`✅ Successfully updated user plan for customer ${customerId}`);
};

const handleSubscriptionEvent = async (subscription: Stripe.Subscription) => {
  console.log(
    `🔍 Handling subscription event for customer ${subscription.customer}`
  );
  const customerId = subscription.customer as string;
  const productId = subscription.items.data[0].price.product as string;
  const plan = await fetchPlanFromStripeProduct({
    id: productId,
  } as Stripe.Product);
  const planExpiry = new Date(subscription.current_period_end * 1000);

  await updateUserPlan(customerId, plan.id, planExpiry, subscription.id);
  console.log(
    `✅ Successfully handled subscription event for customer ${customerId}`
  );
};

const handleSubscriptionDeletedOrPaymentFailed = async (
  subscription: Stripe.Subscription
) => {
  console.log(
    `🔍 Handling subscription deletion/payment failure for customer ${subscription.customer}`
  );
  const customerId = subscription.customer as string;
  await updateUserPlan(customerId, "basic");
  console.log(
    `✅ Successfully handled subscription deletion/payment failure for customer ${customerId}`
  );
};

const handleProductUpdated = async (product: Stripe.Product) => {
  console.log(`🔍 Handling product update for product ${product.id}`);
  const price = await stripe.prices.retrieve(product.default_price as string);
  if (!price) {
    throw new Error(
      `Couldn't fetch default price of ${product.id} with id ${product.default_price}`
    );
  }

  const plan = await fetchPlanFromStripeProduct(product);
  const isPriceChanged = price.unit_amount !== plan.original_price;
  const isStatusChanged = price.active !== (plan.status === "active");

  if (isPriceChanged || isStatusChanged) {
    await prisma.subscription_plans.update({
      data: {
        original_price: price.unit_amount!,
        status: price.active ? "active" : "archived",
      },
      where: { id: plan.id },
    });
    console.log(
      `✅ Successfully updated product ${product.id} details in the database`
    );
  } else {
    console.log(`ℹ️ No changes detected for product ${product.id}`);
  }
};

const handleWebhookEvent = async (event: Stripe.Event) => {
  console.log(`🔍 Handling webhook event: ${event.type}`);
  switch (event.type) {
    case "customer.deleted":
      const customerEmail = event.data.object.email;
      await handleCustomerDeleted(customerEmail);
      break;
    case "customer.created":
      const { email: customer_email, id: customer_id } = event.data.object;
      await handleCustomerCreated(customer_id, customer_email);
      break;
    case "product.updated":
      const product = event.data.object as Stripe.Product;
      await handleProductUpdated(product);
      break;
    case "customer.subscription.created":
    case "customer.subscription.updated":
      await handleSubscriptionEvent(event.data.object as Stripe.Subscription);
      break;
    case "customer.subscription.deleted":
    case "invoice.payment_failed":
      await handleSubscriptionDeletedOrPaymentFailed(
        event.data.object as Stripe.Subscription
      );
      break;
    default:
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
  }
};

const webhookHandler = async (req: NextRequest) => {
  if (req.method !== "POST") {
    console.log(`❌ Method Not Allowed: ${req.method}`);
    return NextResponse.json(
      {
        error: {
          message: `Method Not Allowed`,
        },
      },
      { status: 405 }
    ).headers.set("Allow", "POST");
  }

  try {
    console.log("🔍 Reading request body...");
    const buf = await req.text();
    const sig = req.headers.get("stripe-signature")!;
    console.log("🔍 Constructing event from request...");
    const event = constructStripeEvent(buf, sig, webhookSecret);

    console.log("✅ Successfully constructed event:", event.id);
    await handleWebhookEvent(event);

    return NextResponse.json({ received: true });
  } catch (err) {
    console.log(`❌ Error processing webhook: ${err}`);
    return NextResponse.json(
      {
        error: {
          message: err instanceof Error ? err.message : "Unknown error",
        },
      },
      { status: 400 }
    );
  }
};

export { webhookHandler as POST };
