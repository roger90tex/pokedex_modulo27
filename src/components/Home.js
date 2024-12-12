import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import pokeApi from "../api/pokeApi";
import usePokemonSearch from "../hooks/usePokemonSearch";
import { PaginationButton, PokemonItem, PokemonImage } from "./styles";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 20;
  const { search, filteredPokemons, handleSearch } = usePokemonSearch(pokemons);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await pokeApi.get("pokemon?limit=200");
        const pokemonData = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const pokeDetails = await pokeApi.get(`pokemon/${pokemon.name}`);
            return {
              name: pokemon.name,
              id: pokeDetails.data.id,
              image: pokeDetails.data.sprites.front_default,
            };
          })
        );
        setPokemons(pokemonData);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchPokemons();
  }, []);

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = filteredPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>Pokedex</h1>
      <form>
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Buscar Pokémon..."
        />
      </form>
      <ul>
        {currentPokemons.map((pokemon) => (
          <PokemonItem key={pokemon.id}>
            <Link to={`/pokemon/${pokemon.id}`}>
              <PokemonImage src={pokemon.image} alt={pokemon.name} />
              {pokemon.name}
            </Link>
          </PokemonItem>
        ))}
      </ul>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        {[...Array(Math.ceil(filteredPokemons.length / pokemonsPerPage)).keys()].map((number) => (
          <PaginationButton
            key={number + 1}
            onClick={() => paginate(number + 1)}
            active={currentPage === number + 1}
          >
            {number + 1}
          </PaginationButton>
        ))}
      </div>
    </div>
  );
};

export default Home;