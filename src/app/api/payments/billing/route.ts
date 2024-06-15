import { redirect } from "next/navigation";
import { AuthGuard } from "../../shared";
import { getStripeCustomerFromEmail } from "../utils";
import { stripe } from "../utils/stripe";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const auth_user = AuthGuard();
    if (!auth_user) {
      throw new Error("unauthorized");
    }
    const cust_id = await getStripeCustomerFromEmail(auth_user.email!);
    const session = await stripe.billingPortal.sessions.create({
      customer: cust_id.id,
      return_url: `${process.env.HOST}/subscription-plans`,
    });
    return NextResponse.redirect(session.url);
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
