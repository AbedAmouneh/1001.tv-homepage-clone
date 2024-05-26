"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed w-full p-4 flex justify-between items-center transition-colors duration-300 text-white`}
      style={{
        backgroundColor: scrolled ? "rgba(0, 0, 0, 0.8)" : "transparent",
      }}
    >
      <div className="flex items-center space-x-4">
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
          Sign In
        </button>
        <select className="bg-transparent text-white border border-white rounded px-2 py-1">
          <option value="en">English</option>
          <option value="ar">Arabic</option>
        </select>
        <FaSearch className="text-white" />
      </div>
      <div className="flex items-center space-x-4">
        <nav className="flex space-x-4">
          <a href="#" className="hover:underline text-white">
            Home
          </a>
          <a href="#" className="hover:underline text-white">
            Series
          </a>
          <a href="#" className="hover:underline text-white">
            Movies
          </a>
          <a href="#" className="hover:underline text-white">
            Kids
          </a>
          <Image src="/1001.svg" alt="1001.tv" width={50} height={50} />
        </nav>
      </div>
    </header>
  );
};

export default Header;
