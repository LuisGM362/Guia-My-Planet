import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const KingCheckSpawn = () => {
  const [spawnActivado, setSpawnActivado] = useState(false);
  const [spawnData, setSpawnData] = useState({});

  const activarSpawn = () => {
    const fila = Math.floor(Math.random() * 7) + 4; // FILA 4 - 10
    const columna = Math.floor(Math.random() * 13) + 1; // COLUMNA 1 - 13
    setSpawnData({ fila, columna });
    setSpawnActivado(true);
  };

  const rehacerSpawn = () => {
    activarSpawn();
  };

  return (
    <>
      {!spawnActivado && (
        <Button variant="primary" onClick={activarSpawn}>
          Activar KING CHECK SPAWN
        </Button>
      )}
      {spawnActivado && (
        <>
          <p><strong>KING CHECK SPAWN:</strong> FILA {spawnData.fila} - COLUMNA {spawnData.columna}</p>
          <Button variant="warning" onClick={rehacerSpawn}>
            ↻ Nueva Posicion
          </Button>
          <span className="text-muted ml-2">solo oprimir si ese lugar está ocupado</span>
        </>
      )}
    </>
  );
};

export default KingCheckSpawn;