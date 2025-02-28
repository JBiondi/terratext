
export interface Habitat {
    id: number;
    name: string;
    species: Species[];
}

export interface Species {
    id: number;
    habitat_id: number;
    habitat_name: string;
    name: string;
    latin: string;
    type: string;
    clue: string;
}
