"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Billing = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push(`/dashboard/billing/payment`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Upgrade With Monthly Plan</h1>
      <div className="flex space-x-6">
        <div className="bg-white rounded-lg p-6 w-64 shadow">
          <h2 className="font-semibold mb-2">Free</h2>
          <div className="text-3xl font-bold mb-4">
            0$ <span className="text-sm font-normal">/month</span>
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
          <button className="mt-6 w-full bg-gray-600 text-white py-2 rounded-md">
            Currently Active Plan
          </button>
        </div>
        <div className="bg-white rounded-lg p-6 w-64 shadow">
          <h2 className="font-semibold mb-2">Monthly</h2>
          <div className="text-3xl font-bold mb-4">
            9.99$ <span className="text-sm font-normal">/month</span>
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
              1 Year of History
            </li>
          </ul>
          <button
            onClick={handleGetStarted}
            className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billing;
