"use client";
import React, { useContext, useState } from "react";
import FormSection from "../_components/FormSection";
import OutputSection from "../_components/OutputSection";
import { TEMPLATE } from "../../_components/TemplateListSection";
import Templates from "@/app/(data)/Templates";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { chatSession } from "@/utils/AiModel";
import { AIOutput } from "@/utils/schema";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { eq } from "drizzle-orm";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { UpdateCreditUsageContext } from "@/app/(context)/UpdateCreditUsageContext";

interface PROPS {
  params: {
    "template-slug": string;
  };
}
const CreateNewContent = (props: PROPS) => {
  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug == props.params["template-slug"]
  );
  const [loading, setLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<string>("");

  const { user } = useUser();
  const router = useRouter();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { userSubscription, setUserSubscription } = useContext(
    UserSubscriptionContext
  );
  const { UpdateCreditUsage, setUpdateCreditUsage } = useContext(
    UpdateCreditUsageContext
  );
  const GenerateAIContent = async (formData: any) => {
    if (totalUsage >= 10000 && !userSubscription) {
      router.push("/dashboard/billing");

      return <AlertDialog>Please upgrade</AlertDialog>;
    }
    setLoading(true);
    const SelectedPrompt = selectedTemplate?.aiPrompt;
    const SelectedIcon = selectedTemplate?.icon || "";
    const FinalAIPrompt =
      JSON.stringify(formData) + ", " + SelectedPrompt + SelectedIcon;
    const result = await chatSession.sendMessage(FinalAIPrompt);
    console.log(result.response.text());
    setAiOutput(result?.response.text());
    await SaveInDb(
      JSON.stringify(formData),
      selectedTemplate?.slug,
      result?.response.text(),
      SelectedIcon
    );
    setLoading(false);
    setUpdateCreditUsage(Date.now());
  };

  const SaveInDb = async (
    formData: any,
    slug: any,
    aiResp: string,
    icon: string
  ) => {
    try {
      const result = await db.insert(AIOutput).values({
        formData: formData,
        templateSlug: slug,
        aiResponse: aiResp,
        createdBy: user?.primaryEmailAddress?.emailAddress || "",
        createdAt: moment().format("DD/MM/YYYY"),
        icon: icon,
      });
      console.log("Inserted successfully:", result);
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };

  return (
    <div className="p-5">
      <Link href={"/dashboard"}>
        <Button>
          <ArrowLeft /> Back
        </Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5">
        {/* FormSection */}
        <FormSection
          selectedTemplate={selectedTemplate}
          userFormInput={(v: any) => GenerateAIContent(v)}
          loading={loading}
        />
        {/* OutputSection */}
        <div className="col-span-2">
          <OutputSection aiOutput={aiOutput} />
        </div>
      </div>
    </div>
  );
};

export default CreateNewContent;
