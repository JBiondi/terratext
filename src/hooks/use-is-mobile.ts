"use client";

import React from "react";

export function useIsMobile(breakpoint = 695): boolean {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    function checkIfMobile() {
      const width = window.innerWidth;
      const userAgent = navigator.userAgent.toLowerCase();
      const isTabletUserAgent =
        /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|puffin)/.test(
          userAgent
        );

      setIsMobile(width < breakpoint || isTabletUserAgent);
    }

    checkIfMobile();

    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, [breakpoint]);

  return isMobile;
}
