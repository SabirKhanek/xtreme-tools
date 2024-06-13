"use server";
import prisma from "@/app/shared/prisma";
import { stripe } from "./stripe";
import Stripe from "stripe";

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
