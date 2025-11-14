import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const filters: string[] = [
  "drop-shadow(1px 5px 8px gray)", // light theme
  "drop-shadow(1px 5px 16px #00ee96)", // dark theme
];

export const GlowingLogo = () => {
  const { theme } = useTheme();
  // const [glowUp, setGlowUp] = useState<boolean>(false);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setGlowUp((prev) => !prev);
  //   }, 3000);
  //
  //   return () => clearInterval(intervalId);
  // }, [filters.length]);
  //
  // const currentFilter = useMemo(() => {
  //   return glowUp ? filters[0] : filters[1];
  // }, [glowUp]);

  const imgSrc = useMemo(() => {
    switch (theme) {
      case "light":
        return "/logo-black.png";
      default:
        return "/logo-green.png";
    }
  }, [theme]);

  const glowFilter = useMemo(() => {
    switch (theme) {
      case "light":
        return filters[0];
      default:
        return filters[1]
    }
  }, [theme]);

  return (
    <Image
      src={imgSrc}
      style={{
        filter: glowFilter
        // filter: "drop-shadow(1px 5px 24px #00ee96)",
        // transition: "filter 2s ease",
      }}
      alt="EVVM Logo"
      fill
      objectFit="contain"
    ></Image>
  );
};
