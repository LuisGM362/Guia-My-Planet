import React, { useState } from 'react';
import { Container, Button, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const secciones = [
  {
    titulo: 'SKILLS',
    detalles: [
      'MOV: Permite mover la UNIT en el tablero según la dirección y rango indicados en la carta.',
      'ATK: Permite atacar a otra pieza en el tablero. La posición marcada con "x" indica la pieza que será eliminada.',
      'ESPECIAL: Habilidades únicas que pueden ser MOV, ATK o SKILL, activadas usando el COST indicado en la carta.'
    ]
  },
  {
    titulo: 'KING CARDS',
    detalles: [
      'Son cartas especiales denotadas con la letra KC.',
      'Al activarlas, van a la zona de TRASH.',
      'Pueden tener efectos únicos que afectan el desarrollo del juego.'
    ]
  },
  {
    titulo: 'CHEST',
    detalles: [
      'CHEST aparece en una posición aleatoria del tablero.',
      'Puedes activar CHEST usando el botón correspondiente.',
      'Si la posición está ocupada, puedes generar una nueva ubicación.'
    ]
  }
];

const GuiaConsulta = () => {
  const navigate = useNavigate();
  const [seleccion, setSeleccion] = useState(null);

  const handleVolver = () => {
    setSeleccion(null);
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center">Guía de Consulta</h1>
      {!seleccion && (
        <>
          <p>
            Haz clic en una sección para ver el detalle de <strong>SKILLS</strong>, <strong>KING CARDS</strong> o <strong>CHEST</strong>.
          </p>
          <ListGroup>
            {secciones.map((seccion, idx) => (
              <ListGroup.Item
                action
                key={idx}
                onClick={() => setSeleccion(idx)}
              >
                {seccion.titulo}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      )}
      {seleccion !== null && (
        <>
          <h4 className="mt-4">{secciones[seleccion].titulo}</h4>
          <ul>
            {secciones[seleccion].detalles.map((detalle, i) => (
              <li key={i}>{detalle}</li>
            ))}
          </ul>
          <Button variant="secondary" onClick={handleVolver}>
            ← Volver a secciones
          </Button>
        </>
      )}
      <div className="fixed-bottom bg-light py-2 border-top text-center">
        <Button variant="secondary" onClick={() => navigate('/')}>
          ← Volver inicio
        </Button>
      </div>
    </Container>
  );
};

export default GuiaConsulta;