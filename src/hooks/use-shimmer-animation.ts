import React, { useEffect } from "react";

export default function useShimmerAnimation<T = unknown>(dependency: T, duration: number): boolean {
  const [shimmer, setShimmer] = React.useState(false);

  useEffect(() => {
    setShimmer(true);

    const timer = setTimeout(() => {
      setShimmer(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [dependency, duration]);

  return shimmer;
}
