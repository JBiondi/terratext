import styles from "./habitat-map.module.css";
import Image from "next/image";
import { useHabitat } from "@/context/habitat-context-provider";
import type { Species } from "@/types/types";

interface HabitatProps {
  solvedSpecies: Species[];
}

export default function HabitatMap({ solvedSpecies }: HabitatProps) {
  const { habitats, currentHabitatIndex } = useHabitat();

  // don't check for !currentHabitatIndex because zero is a valid index
  if (!habitats) {
    return <div>Loading habitats...</div>;
  }

  const currentHabitat = habitats[currentHabitatIndex];

  function formatSpeciesName(name: string) {
    return name.replace(/\s+/g, "-");
  }

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
        <div
          key={index}
          className={styles.speciesWrapper}
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
      ))}
    </div>
  );
}
