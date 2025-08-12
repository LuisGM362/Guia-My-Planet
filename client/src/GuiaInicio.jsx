import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PointActivator from './components/PointActivator';
import ChestActivator from './components/ChestActivator';

function GuiaInicio() {
  const navigate = useNavigate();

  const handleVolver = () => {
    navigate('/');
  };

  return (
    <Container className="mt-0 pt-0">
      <h1 className="text-center">Guia de Inicio</h1>
      <h2>Inicio:</h2>
      <p className="text-center">
        <strong>Paso 1:</strong>
        <br />
        Toma tu <strong>UNIT KING</strong> y posiciona en la 
        <br />
        <strong>FILA: 1 - COLUMNA: 7</strong>
        <br />
        <strong>Paso 2:</strong>
        <br />
        Tira el dado, si sale el numero 1, toma una <strong>KING CARD</strong> o <strong>TROOP CARD</strong>.
        Si sale otro numero, toma desde tu mazo de <strong>TROOP CARD</strong> el mismo numero de <strong>UNIT SOLDIER</strong>, 
        luego estas se deben ubicar en la zona <strong>TROOP LIST</strong>.
        Ubica estas <strong>UNIT</strong> dentro de tu <strong>BASE: FILA 1 - 3 / COLUMNA 1 - 13</strong>
        <br />
        <strong>Paso 3:</strong>
        <br />
        Activo el <strong>POINT.</strong>
        <br />
        <PointActivator />
        <br />
        <strong>Paso 4:</strong>
        <br />
        Toma de la zona de <strong>KING CARD</strong>, tantas hasta que tengas 3 en tu mano,
        si ya tienes mas de 3 <strong>CARD</strong> no sacas ninguna.
        <br />
        <strong>Paso 5:</strong>
        <br />
        Tira el dado, segun ese numero puedes ubicar los <strong>CHEST</strong> dentro de la zona 
        <strong>COMBAT (FILA 4 - 10 / COLUMNA 1 - 13)</strong>
        <br />
        <ChestActivator />
        <br />
        <strong>Paso en turno:</strong>
        Cada inicio de turno tira el dado, si sale el numero 1 puedes tomar una 
        <strong>KING CARD</strong> o <strong>TROOP CARD</strong> y luego vuelve a lanzar el dado.
        Puedes activar de tu mano una  o varias <strong>CARD</strong> sin importar el orden de ejecucion,
        Luego de usar las <strong>KING CARD</strong> cada una va a la zona de <strong>TRASH</strong>, si es una 
        <strong>TROOP CARD</strong> se debe ubicar en la zona <strong>TROOP LIST</strong> y la <strong>UNIT</strong> 
        se ubica en el <strong>POINT</strong> si no esta ocupado por otra <strong>UNIT</strong>.
        En tu turno puede usar los <strong>COST</strong> del dado para activar las <strong>UNIT</strong>, hasta que se te acaben.
        Cuando se termina el turno debes tener solo maximo 3 <strong>CARD</strong> en tu mano.
      </p>
      <p className="text-center">Fin de la guia de inicio.</p>
      <div className="fixed-bottom bg-light py-2 border-top text-center">
        <Button variant="secondary" onClick={handleVolver}>
          ← Volver inicio
        </Button>
      </div>
    </Container>
  );
}

export default GuiaInicio;