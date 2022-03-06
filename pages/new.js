import Form from "../components/Form";

const NewPokemon = () => {
  const pokemonForm = {
    name: "",
    rank: 0,
    shadow: false,
    shiny: true,
    fastMove: "",
    chargedMoves: [],
    dexNo: 0,
    league: "",
  };

  return <Form formId="add-pet-form" pokemonForm={pokemonForm} />;
};

export default NewPokemon;
