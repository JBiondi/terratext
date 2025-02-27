'use client';

import React, { useContext } from 'react';
import { supabase } from '@/lib/supabase';

interface Species {
    id: number;
    habitat_id: number;
    habitat_name: string;
    name: string;
    latin: string;
    type: string;
    clue: string;
}

interface Habitat {
    id: number;
    name: string;
    species: Species[];
}

interface HabitatContextType {
    habitats: Habitat[];
    currentHabitat: Habitat | null;
    setCurrentHabitat: React.Dispatch<React.SetStateAction<Habitat | null>>;
    currentSpecies: Species | null;
    setCurrentSpecies: React.Dispatch<React.SetStateAction<Species | null>>;
    loading: boolean;
    error: string | null;
}

const HabitatContext = React.createContext<HabitatContextType | undefined>(undefined);

export function HabitatContextProvider({ children }: { children: React.ReactNode }) {
    const [habitats, setHabitats] = React.useState<Habitat[]>([]);
    const [currentHabitat, setCurrentHabitat] = React.useState<Habitat | null>(null);
    const [currentSpecies, setCurrentSpecies] = React.useState<Species | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        async function fetchHabitats() {
            setLoading(true);

            // the species! line has it check ONLY the ID relationship
            // because I have two FK relationships
            const { data, error } = await supabase.from('habitats').select(`
                    id,
                    name,
                    species!species_habitat_id_fkey (
                        id,
                        habitat_id,
                        habitat_name,
                        name,
                        latin,
                        type,
                        clue
                    )
                `);

            if (error) {
                setError(error.message);
            } else if (data) {
                setHabitats(data);

                // the length check is in case we get back an empty array
                if (data.length > 0) {
                    setCurrentHabitat(data[0]);
                    setCurrentSpecies(data[0].species[0]);
                }
            }
            setLoading(false);
        }

        fetchHabitats();
    }, []);

    return (
        <HabitatContext.Provider
            value={{
                habitats,
                currentHabitat,
                setCurrentHabitat,
                currentSpecies,
                setCurrentSpecies,
                loading,
                error,
            }}
        >
            {children}
        </HabitatContext.Provider>
    );
}

export function useHabitat() {
    const context = useContext(HabitatContext);

    if (context === undefined) {
        throw new Error('useHabitat must be used within a HabitatContextProvider');
    }

    return context;
}
