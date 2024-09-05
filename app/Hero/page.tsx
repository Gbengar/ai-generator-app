"use client";

import Particle from "@/components/Particules/Particule";
import React, { useState } from "react";
import ChatArea from "../chat/component/Chatarea";
import { Mails } from "lucide-react";
import Image from "next/image";
import TextEffect from "../chat/component/TextEffect";
import { SignedOut } from "@clerk/nextjs";
import Link from "next/link";

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
    // Your logic to handle resume or other actions
  };

  return (
    <div className=" bg-[grey]">
      <Particle />

      <div className="h-[100vh] relative">
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-black text-6xl font-bold text-center">
            <TextEffect />
          </h1>
          <div className="animate__animated animate__flipInX animate__delay-2s">
            <p className="text-white mt-4 text-center text-2xl max-w-4xl ">
              Elevate your content creation to the next level with our
              cutting-edge AI-powered app, effortlessly generating compelling
              and premium-quality text in mere seconds.
            </p>
          </div>

          <div className="flex justify-around pt-5 space-x-4">
            <SignedOut>
              <button className="animate__animated animate__fadeInBottomRight animate__delay-3s group relative isolate inline-flex items-center justify-center overflow-hidden text-sm font-medium transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] before:duration-300 before:ease-[cubic-bezier(0.4,0.36,0,1)] before:transition-opacity rounded-md px-3 py-[0.1875rem] shadow-[0_1px_theme(colors.white/0.07)_inset,0_1px_3px_theme(colors.gray.900/0.2)] before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-gradient-to-b before:from-white/20 before:opacity-50 hover:before:opacity-100 after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:rounded-md after:bg-gradient-to-b after:from-white/10 after:from-[46%] after:to-[54%] after:mix-blend-overlay ring-1 bg-gray-900 text-white ring-gray-900">
                <Link href="/sign-up"> Get started for free</Link>

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

              <button className="w-32 text-sm text-white rounded font-bold border border-blue-500 animate__animated animate__fadeInBottomLeft animate__delay-3s">
                <Link href="/sign-in"> Sign In</Link>
              </button>
            </SignedOut>
          </div>
        </div>

        {/* Image to toggle ChatArea */}
        <div
          onClick={handleResume}
          className={`absolute w-1 md:w-24 aspect-square object-contain bottom-6 right-10 bg-transparent cursor-pointer text-white hover:scale-110 ${
            isOpen ? "animate-bounce" : ""
          }`}
        >
          <div className="bg-white flex justify-center items-center rounded-md px-4 animate__animated animate__zoomInDown animate__delay-2s">
            <h1 className="text-black mr-2">Chat</h1>
            <Image alt="chat" src={"/chat.svg"} width={30} height={30} />
          </div>
        </div>

        {/* ChatArea without downward transition */}
        <div
          className={`fixed bottom-10 right-10 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          {isOpen && <ChatArea toggleChat={toggleChat} />}
        </div>
      </div>
    </div>
  );
};

export default Hero;
