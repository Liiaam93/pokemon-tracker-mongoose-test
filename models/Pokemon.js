import mongoose from "mongoose";

/* PetSchema will correspond to a collection in your MongoDB database. */
const PokemonSchema = new mongoose.Schema({
  name: {
    /* The name of this pet */

    type: String,
    required: [true, "Please provide a species name."],
  },
  rank: {
    type: Number,
  },
  dexNo: {
    type: Number,
    required: [true, "Please provide PokeDex Number."],
  },
  shadow: {
    type: Boolean,
  },
  shiny: {
    type: Boolean,
  },
  fastMove: {
    type: String,
  },
  chargedMoves: {
    /* List of dietary needs, if applicable */

    type: Array,
  },
  league: {
    type: String,
    required: [true, "Please select a PvP League."],
  },
});

export default mongoose.models.Pokemon ||
  mongoose.model("Pokemon", PokemonSchema);
