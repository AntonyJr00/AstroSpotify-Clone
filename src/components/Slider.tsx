"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

export const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("relative flex items-center py-2", className)}
    {...props}
  >
    <SliderPrimitive.Track className="bg-blackA7 bg-gray-400/30 relative grow rounded-full h-[4px]">
      <SliderPrimitive.Range className="absolute bg-white group-hover:bg-green-600 rounded-full h-full transition duration-150 ease-out hover:ease-in" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className="w-3 h-3 bg-white shadow-blackA4 rounded-[10px] hover:bg-violet3 focus:outline-none hidden group-hover:block cursor-pointer group"
      aria-label="Volume"
    />
  </SliderPrimitive.Root>
));

Slider.displayName = SliderPrimitive.Root.displayName;

// Todo: Clases de la bola de volumen-----
// *shadow-[0_2px_10px]
// *focus:shadow-[0_0_0_5px]
// *focus:shadow-blackA5
// Todo: Clases de la bola de volumen-----
