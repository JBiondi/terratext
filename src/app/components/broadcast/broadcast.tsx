"use client";

import React from "react";

import useShimmerAnimation from "@/hooks/use-shimmer-animation";

import styles from "./broadcast.module.css";

interface BroadcastProps {
  broadcastMsg: string;
}

export default function Broadcast({ broadcastMsg }: BroadcastProps) {
  const shimmer = useShimmerAnimation(broadcastMsg, 1000);
  const [displayedBroadcastMsg, setDisplayedBroadcastMsg] = React.useState(broadcastMsg);
  const [transitioning, setTransitioning] = React.useState(false);
  const [hidingOldText, setHidingOldText] = React.useState(false);
  const initialMount = React.useRef(true);

  // For the roll in animation
  React.useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      return;
    }

    if (broadcastMsg !== displayedBroadcastMsg) {
      setHidingOldText(true);
      setTransitioning(false);

      const hideDelay = setTimeout(() => {
        setDisplayedBroadcastMsg(broadcastMsg);
        setHidingOldText(false);
        setTransitioning(true);

        const animationDuration = 250; // If you update this, update it in the CSS too
        const animationTimer = setTimeout(() => {
          setTransitioning(false);
        }, animationDuration);

        return () => clearTimeout(animationTimer);
      }, 50);

      return () => {
        clearTimeout(hideDelay);
      };
    }
  }, [broadcastMsg, displayedBroadcastMsg]);

  return (
    <p
      key={broadcastMsg}
      className={`${styles.broadcast} ${shimmer ? styles.shimmer : ""} ${
        hidingOldText ? styles.hidden : ""
      } ${transitioning ? styles.rollingIn : ""}`}
    >
      {displayedBroadcastMsg}
    </p>
  );
}
