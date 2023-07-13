"use client";
import React from "react";
import Image from "next/image";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Avatart from "react-avatar";
function Header() {
  return (
    <header>
      {/* Upper */}
      <div
        className="flex flex-col md:flex-row 
      items-center p-5 justify-between 
       "
      >

      <div className="
      absolute 
      top-0
      left-0
      w-full
      h-96
      bg-gradient-to-br
      from-pink-400
      to-purple-600
      rounded
      filter
      blur-3xl
      opacity-50
      -z-50
      "></div>


        <Image
          placeholder="empty"
          src="/images/bruce.png"
          alt="Picture of the author"
          height="200"
          width="200"
          className="w-44 md:w-56 pb-10 md:pb-0 object-contain"
        />
        <div className="flex space-x-4 ">
          {/* Search Box */}
          <form
            action=""
            className="flex item-center space-x-5 bg-white rounded-md p-2 shadow-md"
          >
            <MagnifyingGlassIcon className="w-6 h-6 text-gray-300" />
            <input type="text" placeholder="Search" />
            <button type="submit" hidden>
              Search
            </button>
          </form>

          {/* Avatar */}
          <Avatart name="Bruce Yu" size="50" round color="purple" />
        </div>
      </div>
      {/* Lower */}
      <div className="flex items-center justify-center px-5 md:py-5">
        <p className="bg-white shadow-xl rounded-md p-2 italic  w-fit max-w-3xl text-purple-600">
          <UserCircleIcon className="inline-block h-10 w-10 fill-purple-700	" />
          Summarizing
        </p>
      </div>
    </header>
  );
}

export default Header;
