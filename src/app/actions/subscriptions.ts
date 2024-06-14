"use server";
import Stripe from "stripe";
import { getPriceId, getStripeCustomerFromEmail } from "../api/payments/utils";
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
    return {
      success: true,
      message: "active subscription found",
      data: subscription,
    };
  }
}

export async function CancelUserSubscription() {
  const user_subscription_req = await getUserSubscription();
  if (!user_subscription_req.success) return user_subscription_req;
  const user_sub = user_subscription_req.data!;

  try {
    const stripe_cancel = await stripe.subscriptions.update(user_sub.id, {
      cancel_at_period_end: true,
    });

    return {
      success: true,
      message: "subscription scheduled to be cancelled at period end",
      data: {
        cancel_at: stripe_cancel.cancel_at && stripe_cancel.cancel_at * 1000,
        id: stripe_cancel.id,
      },
    };
  } catch (err: any) {
    return {
      success: false,
      message:
        "Unable to cancel the subscription. Contact our support for more information.",
    };
  }
}

export async function ResubscribeUserSubscription() {
  const user_subscription_req = await getUserSubscription();
  if (!user_subscription_req.success) return user_subscription_req;
  const user_sub = user_subscription_req.data!;

  try {
    const stripe_renew = await stripe.subscriptions.update(user_sub.id, {
      cancel_at_period_end: false,
    });

    return {
      success: true,
      message: `subscription will be renewed on ${new Date(
        stripe_renew.current_period_end * 1000
      )}`,
      data: {
        renew_on:
          stripe_renew.cancel_at &&
          new Date(stripe_renew.current_period_end * 1000),
        id: stripe_renew.id,
      },
    };
  } catch (err) {
    return {
      success: false,
      message:
        "Unable to resubscribe to the subscription. Contact our support for more information.",
    };
  }
}

export async function SwitchPlan(plan_id: string) {
  const user_subscription_req = await getUserSubscription();
  if (!user_subscription_req.success) return user_subscription_req;
  const plan = await prisma.subscription_plans.findUnique({
    where: { id: plan_id },
  });
  if (!plan) {
    return {
      success: false,
      message: `couldn't find plan with plan_id={${plan_id}}`,
    };
  }
  const { price_id } = await getPriceId(plan);

  try {
    const updated_subscription = await stripe.subscriptions.update(
      user_subscription_req.data!.id,
      {
        items: [
          {
            id: user_subscription_req.data!.items.data[0].id,
            price: price_id,
          },
        ],
        proration_behavior: "create_prorations", // Adjust based on your proration preference
        billing_cycle_anchor: "now", // Reset billing cycle
      }
    );
    return { success: true, message: `Plan switch to ${plan.name}` };
  } catch (err: any) {
    return {
      success: false,
      message:
        "Unable to switch plan! Contact our support for more information.",
    };
  }
}
