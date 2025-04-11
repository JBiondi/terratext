"use client";

import Image from "next/image";
import styles from "./species-image.module.css";
import useShimmerAnimation from "@/hooks/use-shimmer-animation";
import type { Species } from "@/types/types";

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
        width={80}
        height={55}
        className={styles.speciesImage}
      />
    </div>
  );
}


function getSpeciesStyles(species: Species): React.CSSProperties {
  return {
    "--species-top": `${species.top}px`,
    "--species-left": `${species.left}px`,
    "--species-mobile-top": `${species.mobile_top}px`,
    "--species-mobile-left": `${species.mobile_left}px`,
    "--species-mini-top": `${species.mini_top}px`,
    "--species-mini-left": `${species.mini_left}px`,
  } as React.CSSProperties;
}
