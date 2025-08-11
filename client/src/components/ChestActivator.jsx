import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const ChestActivator = () => {
  const [chestActivado, setChestActivado] = useState(false);
  const [chestData, setChestData] = useState({});

  const activarChest = () => {
    const fila = Math.floor(Math.random() * 7) + 4; // FILA 4 - 10
    const columna = Math.floor(Math.random() * 13) + 1; // COLUMNA 1 - 13
    setChestData({ fila, columna });
    setChestActivado(true);
  };

  const rehacerChest = () => {
    activarChest();
  };

  return (
    <>
      {!chestActivado && (
        <Button variant="primary" onClick={activarChest}>
          Activar CHEST
        </Button>
      )}
      {chestActivado && (
        <>
          <p><strong>CHEST:</strong> FILA {chestData.fila} - COLUMNA {chestData.columna}</p>
          <Button variant="warning" onClick={rehacerChest}>
            ↻ Nueva Posicion
          </Button>
          <span className="text-muted ml-2">solo oprimir si ese lugar está ocupado</span>
        </>
      )}
    </>
  );
};

export default ChestActivator;