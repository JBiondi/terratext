import { supabaseServer } from "./supabase-server";

export async function fetchHabitats() {
  // the species! line has it check only the ID relationship
  // because I have two FK relationships
  const { data, error } = await supabaseServer
    .from("habitats")
    .select(
      `
            id,
            name,
            species!species_habitat_id_fkey (
                id,
                habitat_id,
                habitat_name,
                name,
                latin,
                type,
                clue,
                top,
                left,
                mobile_top,
                mobile_left,
                mini_top,
                mini_left,
                alt
            )
        `
    )
    .order("id", { referencedTable: "species" });

  if (error) {
    throw new Error(error.message);
  }

  return data?.map((habitat) => ({
    ...habitat,
    species: habitat.species?.map((species) => ({
      id: species.id,
      habitatId: species.habitat_id,
      habitatName: species.habitat_name,
      name: species.name,
      latin: species.latin,
      type: species.type,
      clue: species.clue,
      top: species.top,
      left: species.left,
      mobileTop: species.mobile_top,
      mobileLeft: species.mobile_left,
      miniTop: species.mini_top,
      miniLeft: species.mini_left,
      alt: species.alt,
    })) ?? [],
  }));
}
