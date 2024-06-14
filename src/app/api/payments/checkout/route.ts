import prisma from "@/app/shared/prisma";
import { NextRequest, NextResponse } from "next/server";
import { AuthGuard } from "../../shared";
import { stripe } from "../utils/stripe";
import { getPriceId, getStripeCustomerFromEmail } from "../utils";
import { subscription_plans } from "@prisma/client";
import Stripe from "stripe";

// Ensure the Stripe secret key is set
if (!process.env.STRIPE_SECRET_KEY) throw new Error("Stripe key is required");

const HOST = process.env.HOST || "http://localhost:3000/";

export interface SubscriptionAdditionalMetadata {
  price_id?: string;
}

export interface CreateSessionResponse {
  success: boolean;
  message?: string;
  data: {
    price_id?: string;
    checkout_url: string;
  };
}

// Handler for the GET request
export async function GET(req: NextRequest) {
  console.log("Received GET request");

  // Authenticate the user
  const auth_user = AuthGuard(req, true);
  if (!auth_user) {
    console.log("Unauthorized request");
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  console.log("Authenticated user:", auth_user.email);
  const customer = await getStripeCustomerFromEmail(auth_user.email);

  const active_plan = (
    await stripe.subscriptions.list({ customer: customer.id })
  ).data.at(0);

  if (active_plan) {
    return NextResponse.json(
      { success: false, message: "Updating Subscription is under development" },
      { status: 400 }
    );
  }

  // Get the subscription plan ID from the request parameters
  const planParam = req.nextUrl.searchParams.get("plan");
  if (!planParam) {
    console.log("Missing plan parameter");
    return NextResponse.json(
      { success: false, message: "Missing plan parameter" },
      { status: 400 }
    );
  }

  console.log("Plan parameter:", planParam);

  // Fetch the subscription plan from the database
  const subscription_plan = await prisma.subscription_plans.findUnique({
    where: { id: planParam },
  });

  if (!subscription_plan) {
    console.log("Invalid subscription plan ID:", planParam);
    return NextResponse.json(
      { success: false, message: "Invalid subscription plan" },
      { status: 400 }
    );
  }

  console.log("Fetched subscription plan:", subscription_plan);

  // Retrieve or create the price ID for the subscription plan
  const { price_id } = await getPriceId(subscription_plan);

  if (!price_id) {
    console.log("Couldn't get price ID for the plan");
    return NextResponse.json(
      { success: false, message: "Couldn't get price id for the plan" },
      { status: 500 }
    );
  }

  console.log("Price ID:", price_id);

  // Retrieve or create the Stripe customer using the authenticated user's email

  console.log("Stripe customer:", customer.id);

  try {
    // Create a Stripe checkout session for the subscription
    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: price_id, quantity: 1 }],
      customer: customer.id,
      mode: "subscription",
      cancel_url: `${HOST}subscription-plans?checkout_result=failure&plan=${planParam}`,
      success_url: `${HOST}subscription-plans?checkout_result=success&plan=${planParam}`,
    });

    console.log("Created checkout session:", session.id);

    // Check if the session URL is available
    if (!session.url) {
      console.log("Couldn't get checkout session URL");
      return NextResponse.json({
        success: false,
        message: "Couldn't get checkout session url",
      });
    }

    // Return the session URL and price ID as the response
    return NextResponse.json({
      success: true,
      data: { price_id, checkout_url: session.url },
    } satisfies CreateSessionResponse);
  } catch (error) {
    // Log the error and return a failure response
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
