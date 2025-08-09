import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PointActivator from './components/PointActivator';

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
        luego estas se deben ubicar en la zona <strong>TROOP LIST.</strong>
        <br />
        <strong>Paso 3:</strong>
        <br />
        Activo el <strong>POINT.</strong>
        <br />
        <PointActivator />
      </p>
      <p className="text-center">Contenido de la guia de inicio.</p>
      <div className="fixed-bottom bg-light py-2 border-top text-center">
        <Button variant="secondary" onClick={handleVolver}>
          ← Volver inicio
        </Button>
      </div>
    </Container>
  );
}

export default GuiaInicio;