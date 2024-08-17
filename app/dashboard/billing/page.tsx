"use client";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { useUser } from "@clerk/nextjs";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";

const stripePaymentLink = process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PLAN_LINK;

const customerPortalLink = process.env.NEXT_PUBLIC_CUSTOMER_PORTAL_URL;

const Billing = () => {
  const router = useRouter();
  const { user } = useUser(); // This provides the current user on the client-side

  const { userSubscription, setUserSubscription } = useContext(
    UserSubscriptionContext
  );

  const handleGetStarted = () => {
    if (user && stripePaymentLink) {
      // Construct the Stripe payment link with pre-filled email

      // Redirect to the Stripe Checkout page
      window.open(
        `${stripePaymentLink}?prefilled_email=${user.primaryEmailAddress?.emailAddress}`
      );

      console.log(stripePaymentLink);
    } else if (!user) {
      // If the user is not logged in, redirect to login
      router.push("/api/auth/login");
    } else {
      // Handle the case where the payment link is not defined
      console.error("Stripe payment link is not defined.");
    }
  };

  const handleCustomerPortal = () => {
    if (user && stripePaymentLink) {
      // Construct the Stripe payment link with pre-filled email

      // Redirect to the Stripe Checkout page
      window.open(`${customerPortalLink}`);

      console.log(stripePaymentLink);
    } else if (!user) {
      // If the user is not logged in, redirect to login
      router.push("/api/auth/login");
    } else {
      // Handle the case where the payment link is not defined
      console.error("Stripe payment link is not defined.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">Upgrade With Monthly Plan</h1>
        <div className="flex space-x-6">
          <div className="bg-white rounded-lg p-6 w-64 shadow">
            <h2 className="font-semibold mb-2">Free</h2>
            <div className="text-2xl font-bold mb-4">
              $0 <span className="text-sm font-normal">/month</span>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                10,000 Words/Month
              </li>
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                50+ Content Templates
              </li>
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Unlimited Download & Copy
              </li>
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                1 Month of History
              </li>
            </ul>
            {!userSubscription && (
              <button className="mt-6 w-full bg-gray-600 text-white py-2 rounded-md">
                Currently Active Plan
              </button>
            )}
          </div>
          <div className="bg-white rounded-lg p-6 w-64 shadow">
            <h2 className="font-semibold mb-2">Monthly</h2>
            <div className="text-2xl font-bold mb-4">
              $9.99 <span className="text-sm font-normal">/month</span>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                1,00,000 Words/Month
              </li>
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                50+ Template Access
              </li>
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Unlimited Download & Copy
              </li>
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                1 Year of History
              </li>
            </ul>
            <button
              onClick={
                userSubscription ? handleCustomerPortal : handleGetStarted
              }
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md"
            >
              {userSubscription ? "Manage Subscription" : "Get Started"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
