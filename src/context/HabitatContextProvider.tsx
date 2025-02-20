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
    loading: boolean;
    error: string | null;
}

const HabitatContext = React.createContext<HabitatContextType | undefined>(
    undefined
);

export function HabitatContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [habitats, setHabitats] = React.useState<Habitat[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        async function fetchHabitats() {
            setLoading(true);
            const { data, error } = await supabase.from('habitats').select(`
                    id,
                    name,
                    species (
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
            }
            setLoading(false);
        }

        fetchHabitats();
    }, []);

    return (
        <HabitatContext.Provider value={{ habitats, loading, error }}>
            {children}
        </HabitatContext.Provider>
    );
}

export function useHabitat() {
    const context = useContext(HabitatContext);

    if (context === undefined) {
        throw new Error(
            'useHabitat must be used within a HabitatContextProvider'
        )
    }

    return context;
};
