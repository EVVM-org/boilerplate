import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

const filters: string[] = [
  "drop-shadow(1px 5px 8px gray)", // light theme
  "drop-shadow(1px 5px 16px #00ee96)", // dark theme
];

export const GlowingLogo = () => {
  const { theme, systemTheme } = useTheme();
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    if (theme == "dark" || (theme == "system" && systemTheme == "dark"))
      setIsDark(true);
    else setIsDark(false);
  }, [theme, systemTheme]);

  const imgSrc = useMemo(
    () => (isDark ? "/logo-green.png" : "/logo-black.png"),
    [isDark],
  );

  const glowFilter = useMemo(
    () => (isDark ? filters[1] : filters[0]),
    [isDark],
  );

  return (
    <Image
      src={imgSrc}
      style={{
        filter: glowFilter,
        // filter: "drop-shadow(1px 5px 24px #00ee96)",
        // transition: "filter 2s ease",
      }}
      alt="EVVM Logo"
      fill
      objectFit="contain"
    ></Image>
  );
};
