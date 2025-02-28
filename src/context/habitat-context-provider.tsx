"use client";

import React, { useContext } from "react";

import type { Habitat } from "@/types/habitat-types";
import type { Species } from "@/types/habitat-types";

interface HabitatContextType {
  habitats: Habitat[];
  setHabitats: React.Dispatch<React.SetStateAction<Habitat[]>>;
  currentHabitat: Habitat | null;
  setCurrentHabitat: React.Dispatch<React.SetStateAction<Habitat | null>>;
  currentSpecies: Species | null;
  setCurrentSpecies: React.Dispatch<React.SetStateAction<Species | null>>;
}

interface Props {
  children: React.ReactNode;
  initialHabitats: Habitat[];
}

const HabitatContext = React.createContext<HabitatContextType | undefined>(undefined);

export function HabitatContextProvider({ children, initialHabitats }: Props) {
    
  const [habitats, setHabitats] = React.useState<Habitat[]>(initialHabitats);
  const [currentHabitat, setCurrentHabitat] = React.useState<Habitat | null>(
    initialHabitats.length > 0 ? initialHabitats[0] : null
  );
  const [currentSpecies, setCurrentSpecies] = React.useState<Species | null>(
    initialHabitats.length > 0 && initialHabitats[0].species.length > 0
      ? initialHabitats[0].species[0]
      : null
  );

  return (
    <HabitatContext.Provider
      value={{
        habitats,
        setHabitats,
        currentHabitat,
        setCurrentHabitat,
        currentSpecies,
        setCurrentSpecies,
      }}
    >
      {children}
    </HabitatContext.Provider>
  );
}

export function useHabitat() {
  const context = useContext(HabitatContext);

  if (context === undefined) {
    throw new Error("useHabitat must be used within a HabitatContextProvider");
  }

  return context;
}
