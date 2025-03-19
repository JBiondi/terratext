import React from "react";

export default function useButtonAnimation(duration: number) {
  const [isAnimating, setIsAnimating] = React.useState(false);

  const triggerAnimation = () => {
    setIsAnimating(true);
  };

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isAnimating) {
      timeout = setTimeout(() => {
        setIsAnimating(false);
      }, duration);
    }

    return () => clearTimeout(timeout);
  }, [isAnimating, duration]);

  return { isAnimating, triggerAnimation };
}
