"use client";

import React from "react";

export function useIsMobile(breakpoint = 695): boolean {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    function checkIfMobile() {
      const smallerDimension = Math.min(window.innerWidth, window.innerHeight);
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileUserAgent = /iphone|ipod|android.*mobile|windows.*phone|blackberry/i.test(
        userAgent
      );
      const isTabletUserAgent =
        /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|puffin)/.test(
          userAgent
        );

      setIsMobile(isMobileUserAgent || smallerDimension < breakpoint || isTabletUserAgent);
    }

    checkIfMobile();

    window.addEventListener("resize", checkIfMobile);

    const handleOrientationChange = () => {
      setTimeout(checkIfMobile, 100);
    };

    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
      window.removeEventListener("orientationchange", checkIfMobile);
    };
  }, [breakpoint]);

  return isMobile;
}
