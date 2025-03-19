import styles from "./habitat-map.module.css";
import Image from "next/image";
import { useHabitat } from "@/context/habitat-context-provider";
import type { Species } from "@/types/types";
import SpeciesImage from "../species-image/species-image";

interface HabitatProps {
  solvedSpecies: Species[];
}

export default function HabitatMap({ solvedSpecies }: HabitatProps) {
  const { habitats, currentHabitatIndex } = useHabitat();

  // don't check !currentHabitatIndex because falsy zero is a valid index
  if (!habitats) {
    return <div>Loading habitats...</div>;
  }

  const currentHabitat = habitats[currentHabitatIndex];

  return (
    <div className={styles.mapContainer}>
      <Image
        className={styles.landscapeImage}
        src={`/images/environments/${currentHabitat.name}.jpg`}
        alt={`An empty ${currentHabitat.name} landscape`}
        width={644}
        height={400}
      />

      {solvedSpecies.map((species, index) => (
        <SpeciesImage
          key={index}
          species={species}
          currentHabitat={currentHabitat}
          animationDuration={1000}
        />
      ))}
    </div>
  );
}
