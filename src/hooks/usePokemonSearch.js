import { useState } from "react";

const usePokemonSearch = (pokemons) => {
    const [search, setSearch] = useState("");
    const [filteredPokemons, setFilteredPokemons] = useState(pokemons);

    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearch(value);
        const filtered = pokemons.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(value)
        );
        setFilteredPokemons(filtered);
    };
    return { search, filteredPokemons, handleSearch };

};

export default usePokemonSearch;
