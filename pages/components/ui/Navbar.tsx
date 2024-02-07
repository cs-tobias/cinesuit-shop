"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Button from "./Button";
import { useCart } from "../contexts/CartContext";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    // Apply overflow style based on isActive state
    document.body.style.overflow = isActive ? "hidden" : "";

    // Cleanup function to reset overflow when component unmounts or isActive changes
    return () => {
      document.body.style.overflow = "";
    };
  }, [isActive]); // Dependency array to watch for changes in isActive

  const closeMenu = () => {
    setIsActive(false);
  };

  const { getCartItemCount } = useCart();
  const cartItemCount = getCartItemCount();

  return (
    <>
      <div className="bg-black fixed top-0 z-50 w-full py-2 bg-opacity-85 backdrop-filter backdrop-blur text-white border-b border-neutral-900">
        <div className="flex justify-between items-center px-6 p-1 mx-auto max-w-5xl">
          {/* Logo */}
          <div className="mt-0.5 hover:text-neutral-300 transition-colors duration-300 cursor-pointer">
            <Link href="/" passHref>
              <div>
                <p className="text-2xl font-semibold tracking-tight">
                  CINESUIT
                </p>
              </div>
            </Link>
          </div>
          <div className="md:block flex items-center gap-1 ml-auto"></div>
          <div className=" hidden md:block">
            <ul className="flex flex-row gap-8 mr-6 text-[14px] text-neutral-400">
              <li>
                <Link href={"/instructions"}>
                  <p className="hover:text-white transition-colors duration-300">
                    Instructions
                  </p>
                </Link>
              </li>
              <li>
                <Link href={"/about"}>
                  <p className="hover:text-white transition-colors duration-300">
                    About
                  </p>
                </Link>
              </li>

              <li>
                <Link href={"/shop"}>
                  <Button
                    size="small"
                    className="text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-300"
                  >
                    Shop
                  </Button>
                </Link>
              </li>
            </ul>
          </div>

          {/* Basket */}
          <div className="pl-5 mt-0.5 cursor-pointer md:hidden">
            <Link href={"/shop"}>
              <Button size="small" className="mr-5 text-white bg-blue-500">
                Shop
              </Button>
            </Link>
          </div>

          <div className="pl-1 mt-0.5 pr-1 pb-1 pt-[1.8px] rounded-md cursor-pointer opacity-75 hover:opacity-100 transition-opacity duration-300">
            <Link href="/cart" passHref>
              <div>
                <Image
                  src="/images/icons/bag-c.svg"
                  width={14}
                  height={14}
                  alt="Basket"
                  className=""
                />
                {cartItemCount > 0 && (
                  <span className="absolute top-7 ml-1 rounded-full bg-white text-black text-[9px] px-1">
                    {cartItemCount}
                  </span>
                )}
              </div>
            </Link>
          </div>

          {/* Hamburger Menu */}
          <button
            aria-label="Menu"
            className="md:hidden py-1 flex flex-col gap-2 mt-[4px] ml-6 opacity-85 hover:opacity-100 cursor-pointer"
            onClick={handleToggle}
          >
            <div
              className={`bg-white w-[18px] h-[1px] transition-transform duration-200 ${
                isActive ? "rotate-45 translate-y-[5px]" : ""
              }`}
            ></div>
            <div
              className={`bg-white w-[18px] h-[1px] transition-transform duration-200 ${
                isActive ? "-rotate-45 -translate-y-1" : ""
              }`}
            ></div>
          </button>
        </div>
      </div>

      {/* Full-Screen Menu Content */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-85 backdrop-filter backdrop-blur text-white transition-opacity duration-300 ${
          isActive ? "opacity-100" : "opacity-0 pointer-events-none"
        } z-40`}
      >
        <div className="flex flex-col items-center justify-center h-screen">
          <ul className="flex flex-col items-center gap-8 text-4xl font-medium text-neutral-400">
            {/* ... menu items ... */}
            <li
              onClick={closeMenu}
              className="hover:text-white transition-colors duration-200"
            >
              <Link href={"/shop"}>
                <p>Shop</p>
              </Link>
            </li>
            <li className="hover:text-white hover:cursor-pointer">
              <Link href={"/instructions"}>
                <p>Instructions</p>
              </Link>
            </li>
            <li className="hover:text-white">
              <Link href={"/about"}>
                <p>About</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default Navbar;
