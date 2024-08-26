"use client"; // This directive marks the component as a Client Component

import Particle from "@/components/Particules/Particule";
import React, { useState } from "react";
import ChatArea from "../chat/component/Chatarea";
import { Mails } from "lucide-react";
import Image from "next/image";

const Hero: React.FC = () => {
  // Use state to manage the open state of the chat
  const [isOpen, setIsOpen] = useState(false);

  // This function toggles the chat visibility
  const toggleChat = () => {
    console.log("toggleChat");
    setIsOpen((prev) => !prev);
  };

  const handleResume = async () => {
    toggleChat();
    // const response = await fetch('/api/files');

    // if (response.status !== 200) {
    //   console.error(response.status, response.statusText);
    // }

    // const blob = await response.blob();
    // const url = window.URL.createObjectURL(blob);
    // const link = document.createElement('a');
    // link.href = url;
    // link.download = 'Vinit_Gupta_Resume.pdf';
    // link.click();
  };

  return (
    <div className="h-[90vh] bg-[grey] relative">
      <Particle />
      <div className="flex flex-col items-center justify-center h-full ">
        <h1 className="text-black text-6xl font-bold text-center">
          AI Content <span className="text-red-700">Generation</span>
        </h1>
        <p className="text-white mt-4 text-center text-2xl max-w-4xl">
          Elevate your content creation to the next level with our cutting-edge
          AI-powered app, effortlessly generating compelling and premium-quality
          text in mere seconds.
        </p>
        <div className="flex justify-around pt-5 space-x-4">
          <button
            className="group relative isolate inline-flex items-center justify-center overflow-hidden text-sm font-medium transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] before:duration-300 before:ease-[cubic-bezier(0.4,0.36,0,1)] before:transition-opacity rounded-md px-3 py-[0.1875rem] shadow-[0_1px_theme(colors.white/0.07)_inset,0_1px_3px_theme(colors.gray.900/0.2)] before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-gradient-to-b before:from-white/20 before:opacity-50 hover:before:opacity-100 after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:rounded-md after:bg-gradient-to-b after:from-white/10 after:from-[46%] after:to-[54%] after:mix-blend-overlay ring-1 bg-gray-900 text-white ring-gray-900"
            onClick={() => (window.location.href = "/")}
          >
            Get started for free
            <svg
              viewBox="0 0 10 10"
              aria-hidden="true"
              className="ml-2 h-2.5 w-2.5 flex-none opacity-60 group-hover:translate-x-6 group-hover:opacity-0 transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] before:duration-300 before:ease-[cubic-bezier(0.4,0.36,0,1)] before:transition-opacity"
            >
              <path
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="m7.25 5-3.5-2.25v4.5L7.25 5Z"
              ></path>
            </svg>
            <svg
              viewBox="0 0 10 10"
              aria-hidden="true"
              className="-ml-2.5 h-2.5 w-2.5 flex-none -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] before:duration-300 before:ease-[cubic-bezier(0.4,0.36,0,1)] before:transition-opacity"
            >
              <path
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="m7.25 5-3.5-2.25v4.5L7.25 5Z"
              ></path>
            </svg>
          </button>
          <button
            className="w-32 text-sm text-white rounded font-bold border border-blue-500"
            onClick={toggleChat}
          >
            Sign In
          </button>
        </div>
      </div>
      <div
        onClick={handleResume}
        className={`absolute w-1 md:w-24 aspect-square object-contain bottom-0 right-10 bg-transparent cursor-pointer text-white hover:scale-110 `}
      >
        <Image alt="chat" src={"/chat.svg"} width={50} height={50} />
      </div>
      {isOpen && <ChatArea toggleChat={toggleChat} />}
    </div>
  );
};

export default Hero;
