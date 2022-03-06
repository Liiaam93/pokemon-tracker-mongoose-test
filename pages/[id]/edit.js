import { useRouter } from "next/router";
import useSWR from "swr";
import Form from "../../components/Form";

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data);

const EditPokemon = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: pokemon, error } = useSWR(
    id ? `/api/pokemons/${id}` : null,
    fetcher
  );

  if (error) return <p>Failed to load</p>;
  if (!pokemon) return <p>Loading...</p>;

  const pokemonForm = {
    name: pokemon.name,
    rank: pokemon.age,
    shadow: pokemon.shadow,
    shiny: pokemon.shiny,
    dexNo: pokemon.dexNo,
    fastMove: pokemon.fastMove,
    chargedMoves: pokemon.chargedMoves,
    league: pokemon.league,
  };

  return (
    <Form
      formId="edit-pokemon-form"
      pokemonForm={pokemonForm}
      forNewPokemon={false}
    />
  );
};

export default EditPokemon;
