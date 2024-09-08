"use client";
import { SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {
  openNav: () => void;
  isActive: (path: string) => boolean;
}

const NavBar: React.FC<Props> = ({ openNav }) => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="w-full fixed z-[100] top-0 h-[8vh] bg-[#F5F6F7]">
      <div className="flex justify-between items-center h-full px-4">
        <div className="flex items-center">
          <Image src={"/newlogo.svg"} alt="logo" width={120} height={100} />
        </div>
        <div className="flex-grow flex justify-center space-x-10 items-center">
          <Link
            href="/"
            className={`nav-link ${
              isActive("/") ? "border-b-2 border-blue-500" : ""
            }`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`nav-link ${
              isActive("/about") ? "border-b-2 border-blue-500" : ""
            }`}
          >
            About
          </Link>
          <Link
            href="/company"
            className={`nav-link ${
              isActive("/company") ? "border-b-2 border-blue-500" : ""
            }`}
          >
            Company
          </Link>
          <Link
            href="/career"
            className={`nav-link ${
              isActive("/career") ? "border-b-2 border-blue-500" : ""
            }`}
          >
            Career
          </Link>
          <Link
            href="/blog"
            className={`nav-link ${
              isActive("/blog") ? "border-b-2 border-blue-500" : ""
            }`}
          >
            Blog
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <SignedIn>
            <Link
              href="/dashboard"
              className={`w-22 text-sm text-black rounded font-bold ${
                isActive("/dashboard") ? "border-b-2 border-blue-500" : ""
              }`}
            >
              Dashboard
            </Link>
          </SignedIn>
          <SignedOut>
            <Link
              href="/sign-in"
              className="w-22 text-sm text-black rounded font-bold"
            >
              Sign In
            </Link>
          </SignedOut>

          <button className="group relative isolate inline-flex items-center justify-center overflow-hidden text-sm font-medium transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] before:duration-300 before:ease-[cubic-bezier(0.4,0.36,0,1)] before:transtion-opacity rounded-md px-3 py-[0.1875rem] shadow-[0_1px_theme(colors.white/0.07)_inset,0_1px_3px_theme(colors.gray.900/0.2)] before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-gradient-to-b before:from-white/20 before:opacity-50 hover:before:opacity-100 after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:rounded-md after:bg-gradient-to-b after:from-white/10 after:from-[46%] after:to-[54%] after:mix-blend-overlay ring-1 bg-gray-900 text-white ring-gray-900">
            <SignedIn>
              <SignOutButton>Log Out</SignOutButton>
            </SignedIn>
            <SignedOut>
              <Link href="/sign-up"> Get Started</Link>
            </SignedOut>

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

          {/* Move the Menu icon inside this flex container */}
          <div onClick={openNav} className="flex items-center md:hidden">
            <Menu className="w-8 h-8 cursor-pointer text-red-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
