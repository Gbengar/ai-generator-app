import { PhoneCall, Video } from "lucide-react";
import React from "react";
import TeamScroll from "./TeamScroll";
import Contact from "./Contact";

const Company = () => {
  return (
    <section className="relative py-20 px-4 md:px-8 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 relative">
          We've got an
          <span className="relative inline-block mx-1">
            entire
            <svg
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[calc(100%+30px)] h-[calc(100%+30px)]"
              viewBox="0 0 140 80"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse
                cx="70"
                cy="40"
                rx="68"
                ry="38"
                stroke="#FF1493"
                strokeWidth="3"
                fill="none"
              />
            </svg>
          </span>
          team dedicated to supporting you and your business
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Get help 24/7, with our award-winning support network of payments
          experts.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="flex items-center px-6 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
            <Video size={15} className="mr-2" />
            Book a call
          </button>
          <button className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
            Get in touch
          </button>
        </div>
      </div>
      {/* <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 opacity-50" /> */}
      <div className="py-10 px-5">
        <TeamScroll />
      </div>
      <div>
        <Contact />
      </div>
    </section>
  );
};

export default Company;
