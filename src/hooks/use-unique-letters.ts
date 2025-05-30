import React from "react";

export function useUniqueLetters(speciesName: string): Set<string> {
  return React.useMemo(() => {
    // that bit of regex removes spaces
    return new Set(speciesName.replace(/\s/g, ""));
  }, [speciesName]);
}
