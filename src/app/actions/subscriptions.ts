"use server";
import { getStripeCustomerFromEmail } from "../api/payments/utils";
import { stripe } from "../api/payments/utils/stripe";
import { AuthGuard } from "../api/shared";
import prisma from "../shared/prisma";

export async function updateUserPlan(planId: string, user_email: string) {
  try {
    const user = await prisma.user.update({
      where: { email: user_email },
      data: { user_plan: planId },
    });
    const { password, ...rest } = user;
    return rest;
  } catch (err: any) {
    console.log("error updating user plan: ");
    console.log(err);
    throw new Error("Couldn't update user plan: ", err.message);
  }
}

export async function getUserSubscription() {
  "use server";
  const auth_user = AuthGuard();
  if (!auth_user) {
    throw new Error("unauthorized");
  }
  const customer = await getStripeCustomerFromEmail(auth_user.email);
  const subscription = (
    await stripe.subscriptions.list({ customer: customer.id, status: "active" })
  ).data.at(0);
  if (!subscription) {
    return { success: false, message: "no active subscription" };
  } else {
    return { success: true, message: "active subscription found" };
  }
}
