import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dbConnect from "../../lib/dbConnect";
import Pokemon from "../../models/Pokemon";

/* Allows you to view pet card info and delete pet card*/
const PokemonPage = ({ pokemon }) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const handleDelete = async () => {
    const pokemonID = router.query.id;

    try {
      await fetch(`/api/pokemons/${pokemonID}`, {
        method: "Delete",
      });
      router.push("/");
    } catch (error) {
      setMessage("Failed to delete the pet.");
    }
  };

  return (
    <div key={pokemon._id}>
      <div className="card">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.dexNo}.png`}
        />
        <h5 className="pet-name">{pokemon.name}</h5>
        <div className="main-content">
          <p className="pet-name">{pokemon.name}</p>

          {/* Extra Pet Info: Likes and Dislikes */}
          <div className="likes info">
            <p className="label">Moves</p>
            <ul>
              <p>{pokemon.fastMove}</p>
              {pokemon.chargedMoves.map((data, index) => (
                <li key={index}>{data} </li>
              ))}
            </ul>
          </div>

          <div className="btn-container">
            <Link href="/[id]/edit" as={`/${pokemon._id}/edit`}>
              <button className="btn edit">Edit</button>
            </Link>
            <button className="btn delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export async function getServerSideProps({ params }) {
  await dbConnect();

  const pokemon = await Pokemon.findById(params.id).lean();
  pokemon._id = pokemon._id.toString();

  return { props: { pokemon } };
}

export default PokemonPage;
