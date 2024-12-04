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

const FreeShipping = () => {
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
              <Icons icon="package" width="20" height="20" strokeWidth="1.1" />
              <span className="ml-1.5">Free Shipping</span>
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
                  <p className="my-1 md:my-2 text-sm md:text-base tracking-normal font-normal">
                    Enjoy
                  </p>
                  Free International Shipping
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogDescription className="text-left text-sm md:text-base lg:text-lg text-gray-700 leading-6 md:leading-7">
                We are pleased to offer FREE shipping to most countries, with
                delivery typically taking 7-11 days. Plus, for most locations,
                VAT is on us—no extra costs or worries on your end.
                <br />
                <br />
                However, please note that import charges or other taxes specific
                to your country may still apply. These are not covered by us and
                are the responsibility of the customer.
                <br /> <br />
                If you prefer expedited shipping through DHL, FedEx, or UPS,
                please be aware that VAT may apply as per your countrys
                regulations.
                <br />
                <br />
                <span className="text-black font-semibold">
                  Not sure if your country qualifies?
                </span>{" "}
                Head to the checkout, enter your address, and we'll display the
                shipping options available for your location.
              </AlertDialogDescription>
            </div>
            <div className="hidden md:block bg-neutral-100 py-4 px-4 md:px-8 -mx-4 md:-mx-8 -mb-8 md:-mb-8 w-[calc(100%+2rem)] md:w-[calc(100%+4rem)] rounded-b-3xl">
              <p className="text-sm md:text-base py-4 text-neutral-600">
                Please note: VAT is not pre-paid for shipments to the United
                Kingdom and Switzerland.
              </p>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </p>
    </div>
  );
};

export default FreeShipping;
