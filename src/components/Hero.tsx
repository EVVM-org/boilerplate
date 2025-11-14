"use client";

import { GlowingLogo } from "./GlowingLogo";

export const Hero = () => {
  return (
    <div className="w-full my-6">
      <div className="w-[25%] my-24 mx-auto h-40 relative">
        {/* this image should be contained to the parent div element, and styled using that div */}
        <GlowingLogo />
      </div>
    </div>
  );
};
