"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

interface HistoryData {
  templateSlug: string;
  aiResponse: string;
  createdAt: string; // Assuming createdAt is a string, adjust if necessary
  words: number; // Assuming words is a number, adjust if necessary
  icon: string;
}

const History = () => {
  const [historyData, setHistoryData] = useState<HistoryData[]>([]);

  const { user } = useUser();

  useEffect(() => {
    const fetchHistoryData = async () => {
      if (user?.primaryEmailAddress?.emailAddress) {
        try {
          const result: HistoryData[] = await db
            .select()
            .from(AIOutput)
            .where(
              eq(AIOutput.createdBy, user.primaryEmailAddress.emailAddress)
            )
            .orderBy(AIOutput.createdAt, "desc")
            .limit(10); // Limit to 10 most recent entries, adjust as needed
          setHistoryData(result);
          console.log(result);
        } catch (error) {
          console.error("Error fetching history data:", error);
        }
      }
    };

    fetchHistoryData();
  }, [user]);

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
                  {historyData.map((item, index) => (
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
                          {item.aiResponse.substring(0, 300)}...
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-xs"> {item.createdAt}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-xs">
                          {item.aiResponse.length}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() =>
                            navigator.clipboard.writeText(item.aiResponse)
                          }
                          className="text-blue-600 hover:text-blue-800 text-xs "
                        >
                          Copy
                        </button>
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
