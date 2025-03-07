import styles from "./habitat-map.module.css";
import Image from "next/image";
import { useHabitat } from "@/context/habitat-context-provider";

export default function HabitatMap() {
  const { currentHabitat } = useHabitat();

  if (!currentHabitat) {
    return <div>Loading ...</div>;
  }

  const allSpecies = currentHabitat.species;
  console.log({ allSpecies });

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

      {allSpecies.map((species, index) => (
        <div
          key={index}
          className={styles.speciesWrapper}
          style={{ top: `${species.top}px`, left: `${species.left}px` }}
        >
          <Image
            src={`/images/species/${formatSpeciesName(species.name)}.jpg`}
            alt={`An adorable ${species.name}`}
            width={80}
            height={55}
            className={styles.speciesImage}
          />
        </div>
      ))}
    </div>
  );
}
