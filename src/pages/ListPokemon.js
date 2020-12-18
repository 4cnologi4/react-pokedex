import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import axios from "axios";

import Pokemon from "./Pokemon";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function ListPokemon({ pokemons }) {
  const [pokemones, setPokemones] = useState(pokemons);
  const [length, setLength] = useState(pokemones.length);
  const [offset, setOffset] = useState(9);
  const limit = 9;
  let urlGetMorePokemons = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

  const fetchMorePokemonData = async () => {
    const req = await axios.get(urlGetMorePokemons);
    const pokemonsResponse = req.data.results;
    // setPokemones((pokemones) => [...pokemones, ...pokemonsResponse]);
    setPokemones((pokemones) => pokemones.concat(pokemonsResponse));
    setLength(pokemones.length + pokemonsResponse.length);
    setOffset(offset + 9);
    console.log(pokemones);
  };

  return (
    <Container>
      <div
        id="scrollableDiv"
        style={{ height: 400, width: "100%", overflow: "auto" }}
      >
        <InfiniteScroll
          dataLength={length}
          next={fetchMorePokemonData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
        >
          <Row>
            {pokemones.map((pokeInfo) => (
              <Col xs={12} sm={6} md={4}>
                <Pokemon key={pokeInfo.id} pokemonInfo={pokeInfo} />
              </Col>
            ))}
          </Row>
        </InfiniteScroll>
      </div>
    </Container>
  );
}
