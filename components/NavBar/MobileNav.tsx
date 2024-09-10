import { CircleX } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  nav: boolean;
  closeNav: () => void;
  isActive: (path: string) => boolean;
}

const MobileNav = ({ nav, closeNav, isActive }: Props) => {
  const navAnimation = nav ? "translate-x-0" : "translate-x-[-100%]";
  return (
    <div
      className={`fixed ${navAnimation} transform transition-all duration-300 top-0 left-0 right-0 bottom-0 z-[1000000] bg-[#09101a]`}
    >
      <div className="w-[100vw] h-[100vh] flex flex-col items-center justify-center">
        <Link
          href="/"
          className={`nav-link-mobile cursor-pointer ${
            isActive("/") ? "text-blue-500" : ""
          }`}
          onClick={closeNav}
        >
          Home
        </Link>
        <Link
          href="/about"
          className={`nav-link-mobile cursor-pointer ${
            isActive("/about") ? "text-blue-500" : ""
          }`}
          onClick={closeNav}
        >
          About
        </Link>
        <Link
          href="/company"
          className={`nav-link-mobile cursor-pointer ${
            isActive("/company") ? "text-blue-500" : ""
          }`}
          onClick={closeNav}
        >
          Company
        </Link>
        <Link
          href="/blog"
          className={`nav-link-mobile cursor-pointer ${
            isActive("/blog") ? "text-blue-500" : ""
          }`}
          onClick={closeNav}
        >
          Blog
        </Link>
        <Link
          href="/career"
          className={`nav-link-mobile cursor-pointer ${
            isActive("/career") ? "text-blue-500" : ""
          }`}
          onClick={closeNav}
        >
          Career
        </Link>
      </div>
      <div
        onClick={closeNav}
        className="absolute z-[10000000] cursor-pointer top-[2rem] right-[2rem] w-[2rem] h-[2rem] text-yellow-400"
      >
        <CircleX />
      </div>
    </div>
  );
};

export default MobileNav;
