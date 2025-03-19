import Image from "next/image";
import useShimmerAnimation from "@/hooks/use-shimmer-animation";
import styles from "./species-image.module.css";
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
      style={{ top: `${species.top}px`, left: `${species.left}px` }}
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
