import React from "react";
import Image from "next/image";
import { Twitter, Linkedin, Github, Dribbble } from "lucide-react";
import ScrollingBanner from "./_component/ScrollingBanner";

const Footer = () => {
  return (
    <>
      <ScrollingBanner />
      <footer className="bg-white py-12 px-4 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start">
            {/* Logo and social icons on the left */}
            <div className="mb-8 md:mb-0 md:w-1/4">
              <div className="mb-4">
                <Image src="/newlogo.svg" alt="logo" width={120} height={100} />
              </div>
              <div className="flex space-x-4">
                <Twitter className="w-5 h-5 text-gray-500" />
                <Linkedin className="w-5 h-5 text-gray-500" />
                <Github className="w-5 h-5 text-gray-500" />
                <Dribbble className="w-5 h-5 text-gray-500" />
              </div>
            </div>

            {/* Navigation columns on the right */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm md:w-3/4">
              <div>
                <h3 className="font-semibold mb-3">Product</h3>
                <ul className="space-y-2">
                  <li>Overview</li>
                  <li>Features</li>
                  <li>
                    Solutions
                    <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                      New
                    </span>
                  </li>
                  <li>Tutorials</li>
                  <li>Pricing</li>
                  <li>Releases</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Company</h3>
                <ul className="space-y-2">
                  <li>About us</li>
                  <li>Careers</li>
                  <li>Press</li>
                  <li>News</li>
                  <li>Media kit</li>
                  <li>Contact</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Resources</h3>
                <ul className="space-y-2">
                  <li>Blog</li>
                  <li>Newsletter</li>
                  <li>Events</li>
                  <li>Help centre</li>
                  <li>Tutorials</li>
                  <li>Support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
