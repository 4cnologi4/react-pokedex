import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

import Saludar from "./pages/Saludar";
import ContextMenu from "./pages/ContextMenu";
import Contacto from "./pages/Contacto";
import ListPokemon from "./pages/ListPokemon";

export default function App() {
  const [pokemons, setPokemones] = useState([]);
  const length = 3;
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${length}`;

  const pokemonsListado = async () => {
    const req = await axios.get(url);
    const pokemones = await req.data.results;
    setPokemones(pokemones);
  };

  useEffect(() => {
    pokemonsListado();
  }, []);

  return (
    <>
      <Router>
        <Link to="/home">
          <Button>Home</Button>
        </Link>
        <Link to="/about">
          <Button>About</Button>
        </Link>
        <Link to="/contacto">
          <Button>Contacto</Button>
        </Link>
        <Link to="/pokemons">
          <Button>Pokemons</Button>
        </Link>

        <Switch>
          <Route path="/home">
            <Saludar />
            <ContextMenu />
          </Route>
          <Route path="/contacto">
            <Contacto />
          </Route>
          <Route path="/pokemons">
            <ListPokemon pokemons={pokemons} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
