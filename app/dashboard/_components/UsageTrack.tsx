"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { AIOutput, Subscription } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useContext, useEffect, useState } from "react";
import { HISTORY } from "../history/page";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { UpdateCreditUsageContext } from "@/app/(context)/UpdateCreditUsageContext";

const UsageTrack = () => {
  const { user } = useUser();

  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);

  const { userSubscription, setUserSubscription } = useContext(
    UserSubscriptionContext
  );

  const { UpdateCreditUsage, setUpdateCreditUsage } = useContext(
    UpdateCreditUsageContext
  );

  const [maxWords, setMaxWords] = useState(10000);
  useEffect(() => {
    if (user) {
      GetData();
      isUserSubscribed();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      GetData();
    }
  }, [UpdateCreditUsage && user]);

  const GetData = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    const result: HISTORY[] = await db
      .select()
      .from(AIOutput)
      .where(eq(AIOutput.createdBy, user.primaryEmailAddress.emailAddress));
    GetTotalUsage(result);
  };

  const isUserSubscribed = async () => {
    if (!user) return;

    const subscriptionResult = await db
      .select()
      .from(Subscription)
      .where(eq(Subscription.userId, user.id));

    if (subscriptionResult.length > 0) {
      const userSubscription = subscriptionResult[0];

      if (userSubscription.active === true) {
        setUserSubscription(true);
        setMaxWords(1000000);
      } else {
        setUserSubscription(false);
        setMaxWords(10000);
      }
    } else {
      setUserSubscription(false);
      setMaxWords(10000);
    }
  };

  const GetTotalUsage = (result: HISTORY[]) => {
    let total: number = 0;
    result.forEach((element) => {
      total = total + Number(element.aiResponse?.length);
    });
    setTotalUsage(total);
    console.log(total);
  };

  return (
    <div className="m-5">
      <div className="bg-primary text-black p-3 rounded-lg ">
        <h2 className="font-medium">Credits</h2>
        <div className="h-2 bg-[#9981f9] w-full rounded-full mt-3">
          <div
            className="h-2 bg-white rounded-full"
            style={{
              width: (totalUsage / maxWords) * 100 + "%",
            }}
          ></div>
        </div>
        <h2 className="text-sm my-2">
          {totalUsage}/{maxWords} Credit used
        </h2>
      </div>
      <Button variant={"secondary"} className="w-full my-3 text-primary ">
        Upgrade
      </Button>
    </div>
  );
};

export default UsageTrack;
