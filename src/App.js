import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import pokeApi from "./api/pokeApi";
import usePokemonSearch from "./hooks/usePokemonSearch";
import "./App.css";
import NotFound from "./NotFound";
import {
  Container,
  Title,
  Form,
  Input,
  PokemonList,
  PokemonItem,
  PokemonImage,
  PaginationButton,
} from "./components/StyledComponents.js";

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

  // Cálculo de los Pokémon para la página actual
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = filteredPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  // Cambiar de página
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
          <li key={pokemon.id}>
            <Link to={`/pokemon/${pokemon.id}`}>
              <img
                src={pokemon.image}
                alt={pokemon.name}
                style={{ width: "100px", height: "100px" }}
              />
              {pokemon.name}
            </Link>
          </li>
        ))}
      </ul>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        {[...Array(Math.ceil(filteredPokemons.length / pokemonsPerPage)).keys()].map((number) => (
          <button
            key={number + 1}
            onClick={() => paginate(number + 1)}
            style={{
              margin: "0 5px",
              padding: "5px 10px",
              backgroundColor: currentPage === number + 1 ? "#4CAF50" : "#ddd",
              color: currentPage === number + 1 ? "white" : "black",
              border: "none",
              cursor: "pointer",
            }}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

const PokemonDetails = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await pokeApi.get(`pokemon/${id}`);
        setPokemon(response.data);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  if (!pokemon) {
    return <p>Cargando...</p>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>{pokemon.name}</h1>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        style={{ width: "150px", height: "150px" }}
      />
      <p>ID: {pokemon.id}</p>
      <h2>Habilidades:</h2>
      <ul>
        {pokemon.abilities.map((ability) => (
          <li key={ability.ability.name}>{ability.ability.name}</li>
        ))}
      </ul>
      <h2>Estadísticas:</h2>
      <ul>
        {pokemon.stats.map((stat) => (
          <li key={stat.stat.name}>
            {stat.stat.name}: {stat.base_stat}
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Menú principal</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;



