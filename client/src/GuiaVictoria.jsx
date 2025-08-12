import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import KingCheckSpawn from './components/KingCheckSpawn.jsx';

function GuiaVictoria() {
  return (
    <Container className="mt-0 pt-0">
      <h1 className="text-center">Victoria en el juego</h1>
      <p className="text-center">
        En el juego se gana al lograr eliminar la <strong>UNIT KING CHECK</strong>, 
        para lograr hacer aparecer a esta <strong>UNIT KING CHECK</strong> se debe 
        primero eliminar a la <strong>UNIT KING</strong>.
        Activo posicion de la <strong>UNIT KING CHECK</strong> en el tablero de juego,
        esta se ubica en la zona de <strong>BASE (FILA 1 - 3 / COLUMNA 1 - 13)</strong>.
        <strong>UNIT KING CHECK</strong> ubicar en:
        <br />
        <KingCheckSpawn />
        <br />
        También se termina el juego 
        con un empate cuando se activa el <strong>SELF-DESTRUCTION</strong>.
      </p>
    </Container>
  );
}

export default GuiaVictoria;