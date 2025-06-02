
export interface Habitat {
    id: number;
    name: string;
    species: Species[];
}

export interface Species {
    id: number;
    habitatId: number;
    habitatName: string;
    name: string;
    latin: string;
    type: string;
    clue: string;
    top: number;
    left: number;
    mobileTop: number;
    mobileLeft: number;
    miniTop: number;
    miniLeft: number;
    alt: string;
}

export interface ButtonState {
    time: boolean;
    action: "next species" | "next habitat" | "restart game";
}