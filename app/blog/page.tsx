"use client";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import React, { useState } from "react";
import MobileNav from "@/components/NavBar/MobileNav";
import { usePathname } from "next/navigation";
import Blog from "./_components/Blog";

const page = () => {
  const [nav, setNav] = useState(false);
  const pathname = usePathname();

  const openNav = () => setNav(true);
  const closeNav = () => setNav(false);

  const isActive = (path: string) => pathname === path;
  return (
    <div className="overflow-x-hidden">
      <div>
        <MobileNav nav={nav} closeNav={closeNav} isActive={isActive} />
        <NavBar openNav={openNav} isActive={isActive} />
        <div className="mt-10">
          <Blog />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default page;
