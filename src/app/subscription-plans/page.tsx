import { getAuthUser } from "../shared/getAuthUser";
import prisma from "../shared/prisma";
import { UpdatePlanButton } from "./components/updatePlanButton";
import { PlanUpdated } from "./components/planUpdated";
import { stripe } from "../api/payments/utils/stripe";
import Stripe from "stripe";
import { CancelPlanButton } from "./components/cancelPlanButton";
// import { FaInfo } from "react-icons/fa6";
import { IoMdInformationCircleOutline as FaInfo } from "react-icons/io";
import { getStripeCustomerFromEmail } from "../api/payments/utils";

export default async function SubscriptionPlanPage() {
  const payload = getAuthUser(true); // Allow for public access
  const userPlanPromise = payload
    ? prisma.user.findFirst({
        where: { uid: payload.uid },
      })
    : Promise.resolve(null); // Return null if no user is authenticated
  const plansPromise = prisma.subscription_plans.findMany({
    orderBy: { level: "asc" },
    where: { status: "active" },
  });
  const [user, plans] = await Promise.all([userPlanPromise, plansPromise]);
  const isSubscribed = user?.stripe_subscription_id ? true : false;
  const userPlan = user ? user.user_plan : ""; // Use an empty string if no user is authenticated
  let subscription_info: Stripe.Subscription | undefined;
  if (user?.stripe_subscription_id) {
    try {
      subscription_info = await stripe.subscriptions.retrieve(
        user?.stripe_subscription_id
      );
    } catch (err: any) {}
  }

  const req_subscription_info = {
    renew_on:
      subscription_info?.current_period_end &&
      new Date(subscription_info?.current_period_end * 1000),
    cancel_at_period_end: subscription_info?.cancel_at_period_end,
    cancel_at:
      subscription_info?.cancel_at &&
      new Date(subscription_info?.cancel_at * 1000),
    status: subscription_info?.status,
    started_at:
      subscription_info?.start_date &&
      new Date(subscription_info?.start_date * 1000),
  };

  return (
    <div className="py-10">
      {user && <PlanUpdated user_id={payload?.uid} />}
      <div className="flex flex-col gap-2 justify-center items-center">
        <h2 className="text-4xl text-primary font-bold">Subscription Plans</h2>
        <span className="text-sm font-light">
          Transform your workflow with xtreme tools.
        </span>
      </div>
      <div className="my-2 grid grid-cols-1 sm:grid-cols-2 900:grid-cols-3 gap-7">
        {plans.map((plan, id) => {
          const isCurrentPlan = plan.id === userPlan;
          return (
            <div
              key={id}
              className="border relative h-full border-black rounded-lg"
            >
              {isCurrentPlan && (
                <div className="bg-[#1c1c1c]/10 w-fit top-10 absolute -translate-y-1/2 rounded-lg">
                  <div className="py-1.5 absolute left-0 h-full">
                    <div className="rounded-lg w-1.5 h-full bg-primary"></div>
                  </div>
                  <div className="px-7 text-primary  py-1 font-medium ">
                    your current plan
                  </div>
                </div>
              )}
              <div className="flex gap-5 justify-between h-full flex-col px-5 py-5">
                <div className="grow">
                  <div className="flex justify-end">
                    <svg
                      width="37"
                      height="40"
                      viewBox="0 0 37 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M36.126 10.24L35.846 9.74C35.4848 9.13538 34.9754 8.63286 34.366 8.28L20.946 0.54C20.3384 0.1875 19.6486 0.00124 18.946 0H18.366C17.6634 0.00124 16.9736 0.1875 16.366 0.54L2.94601 8.3C2.33995 8.65052 1.83654 9.15394 1.48602 9.76L1.20602 10.26C0.853516 10.8677 0.667256 11.5575 0.666016 12.26V27.76C0.667256 28.4626 0.853516 29.1524 1.20602 29.76L1.48602 30.26C1.8456 30.859 2.34699 31.3604 2.94601 31.72L16.386 39.46C16.9906 39.8198 17.6824 40.0066 18.386 40H18.946C19.6486 39.9988 20.3384 39.8126 20.946 39.46L34.366 31.7C34.978 31.3574 35.4834 30.852 35.826 30.24L36.126 29.74C36.4742 29.1306 36.6602 28.442 36.666 27.74V12.24C36.6648 11.5375 36.4786 10.8477 36.126 10.24ZM18.366 4H18.946L30.666 10.76L18.666 17.68L6.66601 10.76L18.366 4ZM20.666 35L32.366 28.24L32.666 27.74V14.22L20.666 21.16V35Z"
                        fill="#58126A"
                      />
                    </svg>
                  </div>
                  <div className="my-3 flex flex-col gap-2">
                    <span className="text-sm font-light text-black">
                      {plan.name}
                    </span>
                    <h2 className="text-primary font-bold text-3xl">
                      {plan.discounted_price === 0
                        ? "FREE"
                        : `$${(plan.discounted_price || 0) / 100}/${
                            plan.subscription_interval === "monthly"
                              ? "mo"
                              : "yr"
                          }`}
                    </h2>
                    <hr className="w-full bg-black h-0.5 my-4" />
                    <div className="flex flex-col gap-2 ">
                      <span className="mb-2 text-black">Includes:</span>
                      {JSON.parse(plan.features || "[]").map(
                        (feat: string, index: number) => (
                          <span key={index} className="flex gap-2 items-center">
                            <svg
                              width="18"
                              height="13"
                              viewBox="0 0 18 13"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17.0139 1.56384L6.41392 12.1638C6.32004 12.2585 6.19224 12.3117 6.05892 12.3117C5.9256 12.3117 5.7978 12.2585 5.70392 12.1638L0.313916 6.7738C0.219256 6.68 0.166016 6.5522 0.166016 6.4188C0.166016 6.2855 0.219256 6.1577 0.313916 6.0638L1.01392 5.3638C1.1078 5.2692 1.2356 5.2159 1.36892 5.2159C1.50224 5.2159 1.63004 5.2692 1.72392 5.3638L6.05392 9.6938L15.6039 0.143843C15.8017 -0.0479475 16.1161 -0.0479475 16.3139 0.143843L17.0139 0.853843C17.1086 0.947723 17.1618 1.07552 17.1618 1.20884C17.1618 1.34216 17.1086 1.46995 17.0139 1.56384Z"
                                fill="black"
                              />
                            </svg>
                            <span className="text-black">{feat}</span>
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {!isCurrentPlan && plan.id !== "basic" && (
                    <UpdatePlanButton
                      current={plan.id === userPlan}
                      planId={plan.id}
                      isUpgrade={isSubscribed}
                    />
                  )}
                  {isCurrentPlan && userPlan !== "basic" && (
                    <div className="flex flex-col gap-2">
                      <ul className="text-sm flex flex-col gap-1">
                        {req_subscription_info.started_at && (
                          <li className="flex gap-2 items-center">
                            <FaInfo />
                            Started at{" "}
                            <span className="font-bold">
                              {new Date(
                                req_subscription_info.started_at
                              ).toDateString()}
                            </span>
                          </li>
                        )}

                        <li className="flex gap-2 items-center text-sm">
                          <FaInfo />
                          {req_subscription_info.cancel_at ? (
                            <span className="">
                              Cancelling on{" "}
                              <span className="font-bold">
                                {new Date(
                                  req_subscription_info.cancel_at
                                ).toDateString()}
                              </span>
                            </span>
                          ) : (
                            <span className="">
                              Upcoming Renewal on{" "}
                              <span className="font-bold">
                                {new Date(
                                  req_subscription_info.renew_on!
                                ).toDateString()}
                              </span>
                            </span>
                          )}
                        </li>
                      </ul>
                      <CancelPlanButton
                        cancel_at={req_subscription_info.cancel_at || null}
                      ></CancelPlanButton>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
