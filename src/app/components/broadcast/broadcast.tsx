"use client";

import React from "react";

import useShimmerAnimation from "@/hooks/use-shimmer-animation";

import styles from "./broadcast.module.css";

interface BroadcastProps {
  broadcastMsg: string;
}

export default function Broadcast({ broadcastMsg }: BroadcastProps) {
  const shimmer = useShimmerAnimation(broadcastMsg, 1000);

  return <p className={`${styles.broadcast} ${shimmer ? styles.shimmer : ""}`}>{broadcastMsg}</p>;
}
