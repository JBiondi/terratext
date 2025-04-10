"use client";

import React from "react";

export function useIsSafari(): boolean {
  const [isSafari, setIsSafari] = React.useState(false);

  React.useEffect(() => {
    // client only
    if (typeof window !== "undefined") {
      const ua = navigator.userAgent.toLowerCase();
      const isSafariBrowser =
        ua.indexOf("safari") !== -1 && ua.indexOf("chrome") === -1 && ua.indexOf("android") === -1;

      setIsSafari(isSafariBrowser);
    }
  }, []);

  return isSafari;
}
