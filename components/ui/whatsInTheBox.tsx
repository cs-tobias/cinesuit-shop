import React, { useState } from "react";

const WhatsInTheBox = () => {
  return (
    <div className="text-center w-full">
      <h2 className="text-4xl tracking-tight font-semibold my-12">
        What's in the Box
      </h2>
      <div className="flex justify-center">
        <div className="flex w-full md:max-w-[980px] bg-neutral-50   justify-center items-center space-x-16 rounded-2xl py-24">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-300 rounded-lg"></div>
            <p className="mt-4">Cinesuit Gear Rings</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-4 h-24 bg-gray-300 rounded-full"></div>
            <p className="mt-4">Screws (+Extra Screws)</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
            <p className="mt-4">Rubber Removal Tool</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsInTheBox;
