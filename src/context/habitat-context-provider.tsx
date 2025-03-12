"use client";

import React from "react";

import type { Habitat } from "@/types/types";

interface HabitatContextType {
  habitats: Habitat[];
  currentHabitatIndex: number;
  setCurrentHabitatIndex: React.Dispatch<React.SetStateAction<number>>;
  currentSpeciesIndex: number;
  setCurrentSpeciesIndex: React.Dispatch<React.SetStateAction<number>>;
}

interface Props {
  children: React.ReactNode;
  habitats: Habitat[];
}

const HabitatContext = React.createContext<HabitatContextType | undefined>(undefined);

export function HabitatContextProvider({ children, habitats }: Props) {
  const [currentSpeciesIndex, setCurrentSpeciesIndex] = React.useState(0);
  const [currentHabitatIndex, setCurrentHabitatIndex] = React.useState<number>(0);

  return (
    <HabitatContext.Provider
      value={{
        habitats,
        currentHabitatIndex,
        setCurrentHabitatIndex,
        currentSpeciesIndex,
        setCurrentSpeciesIndex,
      }}
    >
      {children}
    </HabitatContext.Provider>
  );
}

export function useHabitat() {
  const context = React.useContext(HabitatContext);

  if (context === undefined) {
    throw new Error("useHabitat must be used within a HabitatContextProvider");
  }

  return context;
}
