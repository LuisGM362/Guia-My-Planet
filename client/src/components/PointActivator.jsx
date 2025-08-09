import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const PointActivator = () => {
  const [pointActivado, setPointActivado] = useState(false);
  const [pointData, setPointData] = useState({});

  const activarPoint = () => {
    const fila = Math.floor(Math.random() * 3) + 1;
    const columna = Math.floor(Math.random() * 13) + 1;
    setPointData({ fila, columna });
    setPointActivado(true);
  };

  const rehacerPoint = () => {
    activarPoint();
  };

  return (
    <>
      {!pointActivado && (
        <Button variant="primary" onClick={activarPoint}>
          Activar POINT
        </Button>
      )}
      {pointActivado && (
        <>
          <p><strong>POINT:</strong> FILA {pointData.fila} - COLUMNA {pointData.columna}</p>
          <Button variant="warning" onClick={rehacerPoint}>
            ↻ Nueva Posicion
          </Button>
          <span className="text-muted ml-2">solo oprimir si ese lugar está ocupado</span>
        </>
      )}
    </>
  );
};

export default PointActivator;