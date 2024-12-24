"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 w-full z-10">
      <div className="container mx-auto px-6 py-1 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-900">
          <Image
            src={"/assets/images/notify-logo.jpg"}
            width={64}
            height={64}
            alt="notify-logo"
            className="rounded-full object-cover"
          />
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link href="#features" className="text-gray-600 hover:text-gray-900">
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-gray-600 hover:text-gray-900"
          >
            How It Works
          </Link>
          <Link
            href="#testimonials"
            className="text-gray-600 hover:text-gray-900"
          >
            Testimonials
          </Link>
          <Link href="#contact" className="text-gray-600 hover:text-gray-900">
            Contact
          </Link>
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link
            href="/auth"
            className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-900 focus:outline-none"
          >
            {/* Hamburger Icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <Link
            href="#features"
            className="block px-6 py-2 text-gray-600 hover:bg-gray-50"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="block px-6 py-2 text-gray-600 hover:bg-gray-50"
          >
            How It Works
          </Link>
          <Link
            href="#testimonials"
            className="block px-6 py-2 text-gray-600 hover:bg-gray-50"
          >
            Testimonials
          </Link>
          <Link
            href="#contact"
            className="block px-6 py-2 text-gray-600 hover:bg-gray-50"
          >
            Contact
          </Link>
          <Link
            href="/auth"
            className="block px-6 py-2 bg-gray-900 text-white text-center hover:bg-gray-700 transition"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}