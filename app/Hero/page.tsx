import Particle from "@/components/Particules/Particule";
import React from "react";

const Hero = () => {
  return (
    <div className="h-[90vh] bg-[grey] relative">
      <Particle />
      <div className="flex flex-col items-center justify-center h-full ">
        <h1 className="text-black text-6xl font-bold text-center">
          AI Content <span className="text-red-700">Generation</span>
        </h1>
        <p className="text-white mt-4 text-center  text-2xl max-w-4xl">
          Elevate your content creation to the next level with our cutting-edge
          AI-powered app, effortlessly generating compelling and premium-quality
          text in mere seconds.
        </p>
        <div className="flex justify-around pt-5 space-x-4">
          <button
            className="group relative isolate inline-flex items-center justify-center overflow-hidden text-sm font-medium transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] before:duration-300 before:ease-[cubic-bezier(0.4,0.36,0,1)] before:transtion-opacity rounded-md px-3 py-[0.1875rem] shadow-[0_1px_theme(colors.white/0.07)_inset,0_1px_3px_theme(colors.gray.900/0.2)] before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-gradient-to-b before:from-white/20 before:opacity-50 hover:before:opacity-100 after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:rounded-md after:bg-gradient-to-b after:from-white/10 after:from-[46%] after:to-[54%] after:mix-blend-overlay ring-1 bg-gray-900 text-white ring-gray-900"
            href="/"
          >
            Get started for free
            <svg
              viewBox="0 0 10 10"
              aria-hidden="true"
              className="ml-2 h-2.5 w-2.5 flex-none opacity-60 group-hover:translate-x-6 group-hover:opacity-0 transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] before:duration-300 before:ease-[cubic-bezier(0.4,0.36,0,1)] before:transtion-opacity"
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
              className="-ml-2.5 h-2.5 w-2.5 flex-none -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] before:duration-300 before:ease-[cubic-bezier(0.4,0.36,0,1)] before:transtion-opacity"
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
          <button className="w-32  text-sm text-white  rounded font-bold border  border-blue-500">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
