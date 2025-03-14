import { supabaseServer } from "./supabase-server";

export async function fetchHabitats() {
  // the species! line has it check only the ID relationship
  // because I have two FK relationships
  const { data, error } = await supabaseServer.from("habitats").select(`
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
                alt
            )
        `);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
