"use client";

import Image from "next/image";

import useShimmerAnimation from "@/hooks/use-shimmer-animation";
import type { Species } from "@/types/types";

import styles from "./species-image.module.css";

interface SpeciesImageProps {
  species: Species;
  currentHabitat: { name: string };
  animationDuration: number;
}

function formatSpeciesName(name: string) {
  return name.replace(/\s+/g, "-");
}

export default function SpeciesImage({
  species,
  currentHabitat,
  animationDuration,
}: SpeciesImageProps) {
  const shimmer = useShimmerAnimation(species.id, animationDuration);

  return (
    <div
      className={`${styles.speciesWrapper} ${shimmer ? styles.shimmer : ""}`}
      style={getSpeciesStyles(species)}
    >
      <Image
        src={`/images/species/${currentHabitat.name}/${formatSpeciesName(species.name)}.jpg`}
        alt={species.alt}
        width={86}
        height={58}
        className={styles.speciesImage}
      />
    </div>
  );
}


function getSpeciesStyles(species: Species): React.CSSProperties {
  return {
    "--species-top": `${species.top}px`,
    "--species-left": `${species.left}px`,
    "--species-mobile-top": `${species.mobileTop}px`,
    "--species-mobile-left": `${species.mobileLeft}px`,
    "--species-mini-top": `${species.miniTop}px`,
    "--species-mini-left": `${species.miniLeft}px`,
  } as React.CSSProperties;
}
