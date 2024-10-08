"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import NavBar from "@/components/NavBar/NavBar";
import Hero from "./Hero/page";
import Particle from "@/components/Particules/Particule";
import Footer from "@/components/Footer/Footer";
import MobileNav from "@/components/NavBar/MobileNav";

export default function Home() {
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
        <div className="mt-0">
          <Hero />
        </div>
        <Footer />
      </div>
    </div>
  );
}
