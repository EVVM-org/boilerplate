"use client";

import { GlowingLogo } from "./GlowingLogo";

export const Hero = () => {
  return (
    <div className="w-full my-6">
      <div className="sm:w-[40%] lg:w-[25%] w-[70%] my-24 mx-auto h-40 relative">
        <GlowingLogo />
      </div>
    </div>
  );
};
