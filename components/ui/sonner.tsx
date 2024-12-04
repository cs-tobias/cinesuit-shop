"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: `
            group toast 
            group-[.toaster]:bg-white
            group-[.toaster]:bg-opacity-60
            group-[.toaster]:text-lg 
            group-[.toaster]:text-neutral-800
            group-[.toaster]:border 
            group-[.toaster]:border-gray-200 
            group-[.toaster]:rounded-3xl
            group-[.toaster]:p-4
            group-[.toast] .sonner-icon {
              display: none;
            }
          `,
          description: "group-[.toast]:text-neutral-800",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
