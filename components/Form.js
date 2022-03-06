import { useState } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";
import {
  Button,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
} from "@chakra-ui/react";

const Form = ({ formId, pokemonForm, forNewPokemon = true }) => {
  const router = useRouter();
  const contentType = "application/json";
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: pokemonForm.name,
    rank: pokemonForm.age,
    shadow: pokemonForm.shadow,
    shiny: pokemonForm.shiny,
    dexNo: pokemonForm.dexNo,
    fastMove: pokemonForm.fastMove,
    chargedMoves: pokemonForm.chargedMoves,
    league: pokemonForm.league,
  });

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form) => {
    const { id } = router.query;

    try {
      const res = await fetch(`/api/pokemons/${id}`, {
        method: "PUT",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      const { data } = await res.json();

      mutate(`/api/pokemons/${id}`, data, false); // Update the local data without a revalidation
      router.push("/");
    } catch (error) {
      setMessage("Failed to update pet");
    }
  };

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {
    try {
      const res = await fetch("/api/pokemons", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      router.push("/");
    } catch (error) {
      setMessage("Failed to add pet");
    }
  };

  const handleChange = (e) => {
    const target = e.target;
    const value =
      target.name === "shadow" || target.name === "shiny"
        ? target.checked
        : target.value;

    const name = target.name;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = formValidate();
    if (Object.keys(errs).length === 0) {
      forNewPokemon ? postData(form) : putData(form);
    } else {
      setErrors({ errs });
    }
  };

  /* Makes sure pet info is filled for pet name, owner name, species, and image url*/
  const formValidate = () => {
    let err = {};
    if (!form.name) err.name = "Name is required";
    if (!form.dexNo) err.dexNo = "Dex No is required";
    return err;
  };

  return (
    <>
      <form id={formId} onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          maxLength="20"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="league">League</label>
        <Select
          required
          placeholder={"select a league"}
          name="league"
          value={form.league}
          onChange={handleChange}
        >
          <option name="league" value="Great">
            Great
          </option>
          <option name="league" value="Ultra">
            Ultra
          </option>
          <option name="league" value="Master">
            Master
          </option>
        </Select>
        {/* <RadioGroup name="league" value={form.league} onChange={handleChange}>
          <Stack>
            <Radio name="league" value="Great">
              Great
            </Radio>
            <Radio name="league" value="Ultra">
              Ultra
            </Radio>
            <Radio name="league" value="Master">
              Master
            </Radio>
          </Stack>
        </RadioGroup> */}
        <label htmlFor="rank">Rank</label>
        <input
          type="number"
          name="rank"
          value={form.rank}
          onChange={handleChange}
        />
        <label htmlFor="shadow">Shadow</label>
        <input
          type="checkbox"
          name="shadow"
          checked={form.shadow}
          onChange={handleChange}
        />
        <label htmlFor="shiny">Shiny</label>
        <input
          type="checkbox"
          name="shiny"
          checked={form.shiny}
          onChange={handleChange}
        />
        <label htmlFor="fastMove">Fast Move</label>
        <Input
          name="fastMove"
          maxLength="60"
          value={form.fastMove}
          onChange={handleChange}
        />
        <label htmlFor="chargedMoves">Charged Moves</label>
        <textarea
          name="chargedMoves"
          maxLength="60"
          value={form.chargedMoves}
          onChange={handleChange}
        />
        <label htmlFor="dexNo">Dex No</label>
        <Input
          type="number"
          name="dexNo"
          min={1}
          max={900}
          value={form.dexNo}
          onChange={handleChange}
          required
        />
        <Button type="submit" className="btn">
          Submit
        </Button>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  );
};

export default Form;
