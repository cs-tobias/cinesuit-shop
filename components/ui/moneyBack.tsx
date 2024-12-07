import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Icons from "../ui/Icons";

const MoneyBack = () => {
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  const handleDialogOpenChange = (open: boolean) => {
    setIsAlertDialogOpen(open);
  };

  return (
    <div className="">
      <p className="flex items-center text-xs cursor-pointer hover:underline">
        <AlertDialog
          open={isAlertDialogOpen}
          onOpenChange={handleDialogOpenChange}
        >
          <AlertDialogTrigger asChild>
            <span className="flex items-center hover:cursor-pointer">
              <Icons
                icon="hand-heart"
                width="20"
                height="20"
                strokeWidth="1.1"
              />
              <span className="ml-1.5">14 Day Money Back Guarantee</span>
            </span>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white p-4 md:p-8 rounded-3xl max-w-3xl w-full mx-auto text-center flex flex-col custom-dialogbox-style">
            <button
              className="absolute top-4 right-4 md:top-6 md:right-6 rounded-full bg-neutral-200 text-black text-xl md:text-2xl font-bold p-2 hover:cursor-pointer hover:text-black transition-color duration-300"
              onClick={() => handleDialogOpenChange(false)}
            >
              <Icons icon="x" width="20" height="20" strokeWidth="2" />
            </button>
            <div className="p-4 md:p-10 flex-grow">
              <AlertDialogHeader className="relative">
                <AlertDialogTitle className="text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-10 text-center tracking-tight font-semibold">
                  14 Day Money Back Guarantee
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogDescription className="text-left text-sm md:text-base lg:text-lg text-gray-700 leading-6 md:leading-7">
                We stand by the quality of our products. If you&apos;re not
                satisfied with your Cinesuit purchase, you can return it within
                14 days after receiving the product for a full refund.
                <br />
                <br />
                As a new company, your feedback is invaluable to us. If
                you&apos;re not happy with your purchase, we&apos;d love to hear
                why. Your input helps us improve our products and services for
                future customers.
              </AlertDialogDescription>
            </div>
            <div className="hidden md:block bg-neutral-100 py-4 px-4 md:px-8 -mx-4 md:-mx-8 -mb-8 md:-mb-8 w-[calc(100%+2rem)] md:w-[calc(100%+4rem)] rounded-b-3xl">
              <p className="text-sm md:text-base py-4 text-neutral-600">
                We appreciate your support and are committed to making your
                experience with Cinesuit a positive one.
              </p>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </p>
    </div>
  );
};

export default MoneyBack;
