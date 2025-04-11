
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
    top: number;
    left: number;
    mobile_top: number;
    mobile_left: number;
    mini_top: number;
    mini_left: number;
    alt: string;
}

export interface ButtonState {
    time: boolean;
    action: "next species" | "next habitat" | "restart game";
}