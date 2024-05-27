"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import Search from "./Search";  // Import the Search component

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <header
      className={`fixed z-50 top-0 w-full p-4 flex justify-between items-center transition-colors duration-300 text-white`}
      style={{
        backgroundColor: scrolled ? "rgba(0, 0, 0, 0.8)" : "transparent",
      }}
    >
      <div className="flex items-center space-x-4">
        <div className="relative">
          {/* <Image
            src="https://via.placeholder.com/40x40"
            alt="Profile"
            width={40}
            height={40}
            className="cursor-pointer rounded-full"
            onClick={toggleDropdown}
          /> */}
          {dropdownOpen && (
            <div className="absolute right-[-20] mt-2 w-48 bg-gray-900 text-white rounded-lg shadow-lg">
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-200"
                onClick={closeDropdown}
              >
                قائمتي
              </a>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-200"
                onClick={closeDropdown}
              >
                معلومات حسابك
              </a>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-200"
                onClick={closeDropdown}
              >
                تسجيل خروج
              </a>
            </div>
          )}
        </div>
        <select className="bg-transparent text-white border-none border-white rounded px-2 py-1">
          <option value="ar">عربي</option>
          <option value="en">English</option>
        </select>
        <Search />
      </div>
      <div className="flex items-center justify-center space-x-4 px-8">
        <nav className="flex space-x-10">
          <a href="#" className="hover:underline text-white text-2xl">
            أطفال
          </a>
          <a href="#" className="hover:underline text-white text-2xl">
            وثائقيات
          </a>
          <a href="#" className="hover:underline text-white text-2xl">
            برامج
          </a>
          <a href="#" className="hover:underline text-white text-2xl">
            مسلسلات
          </a>
          <a href="#" className="hover:underline text-green-500 text-2xl">
            الرئيسية
          </a>
          <Image
            src="/1001.svg"
            alt="1001.tv"
            className="px-2"
            width={100}
            height={100}
          />
        </nav>
      </div>
    </header>
  );
};

export default Header;
