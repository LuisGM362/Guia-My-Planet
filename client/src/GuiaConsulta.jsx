import React, { useState } from 'react';
import { Container, Button, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const skillsDetalles = [
  {
    nombre: 'CALL',
    descripcion:
      `Al usar esta SKILL se llama al tablero una UNIT SOLDIER, 
      mientras no haya el UNIT MAX de la misma, se ubica en el POINT.`
  },
  {
    nombre: 'CHEST',
    descripcion:
      `Al usar esta SKILL tiene el efecto de crear una pieza que ocupa una casilla
       en el tablero de juego que contiene una AMMO, esta pieza queda fija y no se puede mover, 
       solamente se puede crear esta pieza en tu zona COMBAT en un lugar seleccionado, 
       cuando una UNIT llega a el lugar de esta pieza se obtiene la AMMO y 
       se equipa a la UNIT que la obtuvo.`
  },
  {
    nombre: 'POINT',
    descripcion:
      'Al usar esta SKILL tiene el efecto de crear una marca en una casilla en el tablero de juego, esta marca queda fija y de ella será el lugar de llamada de las nuevas UNIT que sean llamadas al tablero del juego, solamente se puede crear esta marca en tu BASE.'
  },
  {
    nombre: 'REINFORCE',
    descripcion:
      'Al usar esta SKILL tiene el efecto de tomar una TROOP CARD de la zona de TROOP CARDS y añadirla a tu mano.'
  },
  {
    nombre: 'ESCAPE',
    descripcion:
      'Al usar esta SKILL tiene el efecto de poder mover la UNIT KING para izquierda o derecha al final del tablero. Este MOV no consume COST, esto se puede realizar mientras no haya ninguna pieza en el tablero que interrumpa el MOV.'
  },
  {
    nombre: 'RELOAD',
    descripcion:
      'Al usar esta SKILL recupera la última carta de la zona de TRASH y la devuelve a tu mano.'
  },
  {
    nombre: 'HELP',
    descripcion:
      'Al usar esta SKILL tiene el efecto de si una UNIT rival entra en tu BASE, puedes mover una UNIT a dos casillas de distancia de la UNIT KING que se encuentre dentro de tu BASE y cubrir cualquier zona de una casilla adyacente de la UNIT KING.'
  },
  {
    nombre: 'WALL',
    descripcion:
      'Al usar esta SKILL tiene el efecto de crear una pieza que ocupa una casilla en el tablero de juego que puede ser destruida con ATK del rival, esta pieza queda fija y no se puede mover, solamente se puede crear esta pieza en tu BASE en un lugar adyacente de la UNIT KING que esté libre, solo se puede usar esta SKILL una vez por turno.'
  },
  {
    nombre: 'KING CALL',
    descripcion:
      'Al usar esta SKILL tiene el efecto de tomar una KING CARD de la zona de KING CARDS y añadirla a tu mano.'
  },
  {
    nombre: 'TARGET',
    descripcion:
      'Al usar esta SKILL tiene el efecto de posicionar el TARGET en la posición de la UNIT rival seleccionada que esté en tu BASE.'
  },
  {
    nombre: 'SELF-DESTRUCTION',
    descripcion:
      'Al usar esta SKILL se crea una pieza que no se coloca en el tablero, se debe tener tres piezas para hacer que la partida termine en empate, se puede utilizar esta SKILL solamente una vez por turno.'
  }
];

const secciones = [
  {
    titulo: 'SKILLS',
    detalles: skillsDetalles
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