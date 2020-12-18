import React, { useState, useEffect } from "react";

export default function Saludar(props) {
  console.log(props);

  const [stateCar, setStateCar] = useState(false);
  const [contar, setContar] = useState(0);

  useEffect(() => {
    console.log("Total de clicks " + contar);
  }, [contar]);

  const onOff = () => {
    setStateCar(!stateCar), setContar(contar + 1);
  };

  return (
    <div>
      <h2>El auto está {stateCar ? "Encendido" : "Apagado"} </h2>
      <button className="btn btn-primary" onClick={onOff}>
        On / Off
      </button>
      <h4>Clicks {contar}</h4>
    </div>
  );
}
