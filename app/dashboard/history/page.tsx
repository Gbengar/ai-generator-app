import React from "react";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";

export interface HISTORY {
  id: Number;
  formData: string;
  aiResponse: string | null;
  templateSlug: string;
  createdBy: string;
  createdAt: string | null;
  icon: string;
}

const History = async () => {
  const user = await currentUser();

  {
    /* @ts-ignore */
  }

  const HistoryList: HISTORY[] = await db
    .select()
    .from(AIOutput)
    .where(
      eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress || "")
    )
    .orderBy(desc(AIOutput.id));

  return (
    <div className="flex h-screen  ">
      <div className="flex-1 flex flex-col overflow-hidden  bg-gray-300 p-5">
        <div className="flex-1 overflow-x-hidden overflow-y-auto border shadow-sm  bg-white rounded-lg ">
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-4xl font-bold ">History</h1>
            <p className="text-gray-300 mb-4">
              Search your previously generated AI content
            </p>
            <div className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Template
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      AI Resp
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Words
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Copy
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {HistoryList.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <Image
                            src={item.icon}
                            alt="logo"
                            width={20}
                            height={20}
                          />
                          <span>{item.templateSlug}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-normal break-words max-w-xs">
                        <p className="text-sm">
                          {item.aiResponse
                            ? item.aiResponse.substring(0, 300)
                            : "..."}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-xs"> {item.createdAt}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-xs">
                          {item.aiResponse?.length}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button
                          // onClick={() =>
                          //   navigator.clipboard.writeText(item.aiResponse)
                          // }
                          className=" bg-gray-300 text-blue-600 hover:text-blue-800 text-xs "
                        >
                          Copy
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
