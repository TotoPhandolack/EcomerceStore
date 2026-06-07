'use client';

import { APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

type LogoProps = {
  className?: string;
  height?: number;
  width?: number;
  priority?: boolean;
};

const LIGHT_LOGO = "/images/Light%20theme.png";
const DARK_LOGO = "/images/Dark%20theme.png";

const Logo = ({
  className,
  height = 86,
  width = 86,
  priority = false,
}: LogoProps) => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const src = mounted && resolvedTheme === "dark" ? DARK_LOGO : LIGHT_LOGO;

  return (
    <Image
      src={src}
      height={height}
      width={width}
      alt={`${APP_NAME} logo`}
      priority={priority}
      className={cn("rounded-[15%] object-contain", className)}
    />
  );
};

export default Logo;
