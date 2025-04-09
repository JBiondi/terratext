"use client";

import React from "react";

export function useIsMobile(breakpoint = 650): boolean {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    function checkIfMobile() {
      setIsMobile(window.innerWidth < breakpoint);
    }

    checkIfMobile();

    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, [breakpoint]);

  return isMobile;
}
