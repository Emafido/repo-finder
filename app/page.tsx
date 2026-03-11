"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Map, SearchX, RotateCcw, Menu } from "lucide-react";

export default function Home() {
  const [width, setWidth] = useState<number>(0);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setWidth(window.innerWidth);
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return (
    <div className="bg-gray-100 min-h-screen">
      <nav>
        {width > 0 && (
          <div>
            {width < 768 ? (
              <div className="border-b-2 flex justify-between items-center text-black px-4 sm:px-6 py-4 border-blue-600 shadow-blue-600 ">
                <Link href="/" className="text-xl font-bold">
                  RepoFinder
                </Link>
                <Menu />
              </div>
            ) : (
              <nav className="border-b-2 border-blue-600 shadow-blue-600 flex justify-between items-center text-black px-4 sm:px-6 py-4">
                <Link href="/" className="text-xl font-bold">
                  RepoFinder
                </Link>
                <div className="flex gap-2 sm:gap-6 flex-wrap">
                  <p className="hover:bg-blue-600 py-2 px-4 rounded-2xl hover:text-white transition-colors duration-200 cursor-pointer">
                    Documentation
                  </p>
                  <Link
                    href="https://github.com/Emafido/repo-finder"
                    target="_blank"
                    className="hover:bg-blue-600 py-2 px-4 rounded-2xl hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    Star on github
                  </Link>
                </div>
              </nav>
            )}
          </div>
        )}
      </nav>

      <div className="border w-fit max-w-4xl my-4 sm:my-6 md:my-10 rounded-[15px] border-gray-200 shadow-xl mx-auto text-black p-6 md:p-15">
        <div className="flex flex-col items-center gap-2 mt-4 sm:mt-10">
          <Map
            size={48}
            className="bg-gray-400 p-2 rounded-full text-blue-600"
          />
          <p className="text-xl font-bold ">Find a Repository</p>
          <p className="text-center text-gray-500 text-sm">
            Discover your next open source contribution with a single click
          </p>
        </div>
        <div className="flex flex-col gap-2 mt-4 sm:mt-10">
          <label htmlFor="language">Programming Language</label>
          <input
            type="text"
            id="language"
            className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none bg-gray-200 focus:ring-2 focus:ring-blue-600"
            placeholder="Pick a Programming Language"
          />
        </div>
        <div className="flex border items-center justify-center mt-5 rounded-md py-2 px-4 bg-blue-600 text-white cursor-pointer gap-2 hover:bg-blue-600 transition-all duration-500 hover:scale-105 transform">
          <RotateCcw className="transition-transform duration-200 hover:rotate-180" />
          <p>Fetch Random Repository</p>
        </div>
        <div className="flex flex-col items-center gap-2 mt-4 sm:mt-10 border border-gray-300 rounded-md py-6 sm:py-10 px-4 bg-gray-200">
          <SearchX />
          <p className="text-xl font-bold ">No Repository Found</p>
          <p className="text-center text-gray-500 text-sm">
            Pick a programming language and click the button to see the magic
            happen
          </p>
          <p className="font-semibold text-blue-600 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
            Learn More
          </p>
        </div>
      </div>
    </div>
  );
}
