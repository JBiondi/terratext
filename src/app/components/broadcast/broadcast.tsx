import React, { useEffect } from "react";
import styles from "./broadcast.module.css";

interface BroadcastProps {
  broadcastMsg: string;
}

export default function Broadcast({ broadcastMsg }: BroadcastProps) {
  const [shimmer, setShimmer] = React.useState(false);

  useEffect(() => {
    setShimmer(true);

    const timer = setTimeout(() => {
      setShimmer(false);
    }, 750);

    return () => clearTimeout(timer);
  }, [broadcastMsg]);

  return <p className={`${styles.broadcast} ${shimmer ? styles.shimmer : ""}`}>{broadcastMsg}</p>;
}
