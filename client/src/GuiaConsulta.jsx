import React, { useState } from 'react';
import { Container, Button, ListGroup, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ChestActivator from './components/ChestActivator';
import PointActivator from './components/PointActivator';
import escapeImg from './assets/imagenes/escape.jpg';
import atkSilenceImg from './assets/imagenes/atk_silence.jpg';
import atkBombImg from './assets/imagenes/atk_bomb.jpg';

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
       se equipa a la UNIT que la obtuvo.`,
    componente: <ChestActivator />
  },
  {
    nombre: 'POINT',
    descripcion:
      `Al usar esta SKILL tiene el efecto de crear una marca en una casilla en el tablero de juego, 
      esta marca queda fija y de ella será el lugar de llamada de las nuevas UNIT que sean llamadas al tablero del juego, 
      solamente se puede crear esta marca en tu BASE.`,
    componente: <PointActivator />
  },
  {
    nombre: 'REINFORCE',
    descripcion:
      'Al usar esta SKILL tiene el efecto de tomar una TROOP CARD de la zona de TROOP CARDS y añadirla a tu mano.'
  },
  {
    nombre: 'ESCAPE',
    descripcion:
      `Al usar esta SKILL tiene el efecto de poder mover la UNIT KING para izquierda o derecha al final del tablero. 
      Este MOV no consume COST, esto se puede realizar mientras no haya ninguna pieza en el tablero que interrumpa el MOV.`,
    componente: <img src={escapeImg} alt="Ejemplo de escape" style={{ maxWidth: '300px', margin: '10px 0' }} />
  },
  {
    nombre: 'RELOAD',
    descripcion:
      'Al usar esta SKILL recupera la última carta de la zona de TRASH y la devuelve a tu mano.'
  },
  {
    nombre: 'HELP',
    descripcion:
      `Al usar esta SKILL tiene el efecto de si una UNIT rival entra en tu BASE, 
      puedes mover una UNIT a dos casillas de distancia de la UNIT KING que se encuentre dentro de tu BASE y 
      cubrir cualquier zona de una casilla adyacente de la UNIT KING.`
  },
  {
    nombre: 'WALL',
    descripcion:
      `Al usar esta SKILL tiene el efecto de crear una pieza que ocupa una casilla en el tablero de juego 
      que puede ser destruida con ATK del rival, esta pieza queda fija y no se puede mover, 
      solamente se puede crear esta pieza en tu BASE en un lugar adyacente de la UNIT KING que esté libre, 
      solo se puede usar esta SKILL una vez por turno.`
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
      `Al usar esta SKILL se crea una pieza que no se coloca en el tablero, 
      se debe tener tres piezas para hacer que la partida termine en empate, 
      se puede utilizar esta SKILL solamente una vez por turno.`
  }
];
const kingCardDetalles = [
  {
    nombre: 'DADO x2',
    limit: 1,
    descripcion: 'Duplica el valor del dado lanzado. Después de activar se descarta esta KING CARD al TRASH.'
  },
  {
    nombre: 'DADO +3',
    limit: 2,
    descripcion: 'Añade +3 al valor del dado lanzado. Después de activar se descarta esta KING CARD al TRASH.'
  },
  {
    nombre: 'DADO +1',
    limit: 3,
    descripcion: 'Añade +1 al valor del dado lanzado. Después de activar se descarta esta KING CARD al TRASH.'
  },
  {
    nombre: 'ELITE CARD',
    limit: 1,
    descripcion: `Busca en la zona de TROOP CARDS una ELITE CARD y añádela a tu mano, luego baraja el TROOP CARDS. 
        Después de activar se descarta esta KING CARD al TRASH.`
  },
  {
    nombre: 'RARE CARD',
    limit: 2,
    descripcion: `Busca en la zona de TROOP CARDS una RARE CARD y añádela a tu mano, 
        luego baraja el TROOP CARDS. Después de activar se descarta esta KING CARD al TRASH.`
  },
  {
    nombre: 'COMMON CARD',
    limit: 3,
    descripcion: `Busca en la zona de TROOP CARDS una COMMON CARD y añádela a tu mano, 
        luego baraja el TROOP CARDS. Después de activar se descarta esta KING CARD al TRASH.`
  },
  {
    nombre: 'ATK +',
    limit: 1,
    descripcion: `Realiza un ATK SILENCE: elimina a una UNIT adyacente a la UNIT seleccionada con esta KING CARD. 
        Este ATK SILENCE no consume COST. Después de activar se descarta esta KING CARD al TRASH.`,
    componente: <img src={atkSilenceImg} alt="Ejemplo de ATK SILENCE" style={{ maxWidth: '300px', margin: '10px 0' }} />
  },
  {
    nombre: 'ATK EXTRA',
    limit: 2,
    descripcion: `Realiza un ATK o ESPECIAL que realice un ATK de su listado de SKILLS. 
        Este ATK EXTRA no consume COST. Después de activar se descarta esta KING CARD al TRASH.`
  },
  {
    nombre: 'MOV EXTRA',
    limit: 3,
    descripcion: `Realiza un MOV o ESPECIAL que realice un MOV de su listado de SKILLS. 
        Este MOV EXTRA no consume COST. Después de activar se descarta esta KING CARD al TRASH.`
  },
  {
    nombre: 'NEW CARDS',
    limit: 1,
    descripcion: `Al ser mandada al TRASH, manda tu mano las KING CARD a la zona KING CARDS, 
        baraja la zona KING CARDS y toma el mismo número de KING CARD que mandaste.`
  },
  {
    nombre: 'CHANGE',
    limit: 2,
    descripcion: `Al ser mandada al TRASH, manda tu mano una KING CARD a la zona KING CARDS, 
        baraja la zona KING CARDS y toma una KING CARD.`
  },
  {
    nombre: 'SHUFFLE',
    limit: 3,
    descripcion: 'Al ser mandada al TRASH, baraja la zona KING CARDS.'
  },
  {
    nombre: 'MISSILE',
    limit: 1,
    descripcion: `Efectúa un ATK hacia un UNIT del rival donde está posicionado el TARGET. 
        Después de activar se descarta esta KING CARD al TRASH.`
  },
  {
    nombre: 'TARGET',
    limit: 2,
    descripcion: `Posiciona el TARGET en la posición de la UNIT rival seleccionada. 
        Después de activar se descarta esta KING CARD al TRASH`
  },
  {
    nombre: 'SHIELD',
    limit: 3,
    descripcion: `Selecciona una UNIT y esta no es destruida por un ATK que el rival realice contra la UNIT. 
        Estará protegida hasta que sea atacada, luego de un ataque se descarta y la UNIT no es destruida. 
        Después de activar se descarta esta KING CARD al TRASH.`
  },
  {
    nombre: 'ATK RANGE +1',
    limit: 1,
    descripcion: `Aumenta el rango de los ATK o ESPECIAL que realice un ATK de su listado de SKILLS. 
        Este ATK tiene un rango +1 para eliminar las piezas rivales. Después de activar se descarta esta KING CARD al TRASH.`
  },
  {
    nombre: 'MOV x2',
    limit: 2,
    descripcion: `Aumenta el rango de los MOV o ESPECIAL que realice un MOV de su listado de SKILLS. 
        Este MOV tiene un rango x2 para mover la pieza por el tablero. Después de activar se descarta esta KING CARD al TRASH.`
  },
  {
    nombre: 'WALL',
    limit: 3,
    descripcion: `Crea una pieza que ocupa una casilla en el tablero de juego que puede ser destruida con ATK del rival. 
        Esta pieza queda fija y no se puede mover, solamente se puede crear esta pieza en tu BASE en un lugar seleccionado. 
        Después de activar se descarta esta KING CARD al TRASH.`
  },
  {
    nombre: 'REPEAT',
    limit: 1,
    descripcion: 'Al ser mandada al TRASH, recupera una carta de la zona de TRASH y la devuelve a tu mano.'
  },
  {
    nombre: 'RELOAD',
    limit: 2,
    descripcion: 'Al ser mandada al TRASH, recupera la última carta de la zona de TRASH y la devuelve a tu mano.'
  },
  {
    nombre: 'CHEST',
    limit: 3,
    descripcion: `Crea una pieza que ocupa una casilla en el tablero de juego que contiene una AMMO, 
        esta pieza queda fija y no se puede mover, solamente se puede crear esta pieza en tu zona COMBAT 
        en un lugar seleccionado, cuando una UNIT llega a el lugar de esta pieza se obtiene la AMMO 
        y se equipa a la UNIT que la obtuvo. Después de activar se descarta esta KING CARD al TRASH.`,
    componente: <ChestActivator />
  },
  {
    nombre: 'RETURN KING',
    limit: 1,
    descripcion: `Hace que una UNIT KING CHECK se convierta en una UNIT KING. 
        Después de activar se descarta esta KING CARD al TRASH.`
  },
  {
    nombre: 'BACK UNIT',
    limit: 2,
    descripcion: `Al ser mandada al TRASH, selecciona una UNIT del tablero que no sea la UNIT KING o UNIT KING CHECK, 
        la devuelve a la zona de TROOP CARD.`
  },
  {
    nombre: 'POINT',
    limit: 3,
    descripcion: `Crea una marca en una casilla en el tablero de juego, esta marca queda fija 
        y de ella será el lugar de llamada de las nuevas UNIT que sean llamadas al tablero del juego, 
        solamente se puede crear esta marca en tu BASE. Después de activar se descarta esta KING CARD al TRASH.`,
    componente: <PointActivator />
  },
  {
    nombre: 'KING CALL',
    limit: 1,
    descripcion: `Toma una KING CARD de la zona de KING CARDS y añádela a tu mano. 
        Después de activar se descarta esta KING CARD al TRASH.`
  },
  {
    nombre: 'REINFORCE',
    limit: 2,
    descripcion: `Toma una TROOP CARD de la zona de TROOP CARDS y añádela a tu mano. 
        Después de activar se descarta esta KING CARD al TRASH.`
  },
  {
    nombre: 'RETREAT',
    limit: 3,
    descripcion: `Selecciona una UNIT del tablero que no sea la UNIT KING o UNIT KING CHECK, 
        la devuelve a tu mano. Después de activar se descarta esta KING CARD al TRASH.`
  },
  {
    nombre: 'SAVE KING',
    limit: 1,
    descripcion: `Si una UNIT rival entra en tu BASE, puedes sacrificar una UNIT 
        y cambiar de lugar con la UNIT KING o UNIT KING CHECK que se encuentre dentro de tu BASE. 
        Después de activar se descarta esta KING CARD al TRASH.`
  },
  {
    nombre: 'HELP',
    limit: 2,
    descripcion: `Si una UNIT rival entra en tu BASE, puedes mover una UNIT a dos casillas de distancia de la UNIT KING o 
        UNIT KING CHECK que se encuentre dentro de tu BASE, y cubrir cualquier zona de una casilla adyacente de la UNIT KING o 
        UNIT KING CHECK. Después de activar se descarta esta KING CARD al TRASH.`
  },
  {
    nombre: 'ESCAPE',
    limit: 3,
    descripcion: `Puedes mover la UNIT KING o UNIT KING CHECK para izquierda o derecha al final del tablero. 
        Este MOV no consume COST, esto se puede realizar mientras no haya ninguna pieza en el tablero que interrumpa el MOV. 
        Después de activar se descarta esta KING CARD al TRASH.`,
    componente: <img src={escapeImg} alt="Ejemplo de escape" style={{ maxWidth: '300px', margin: '10px 0' }} /> 
  }
];
const ammoDetalles = [
  {
    nombre: 'DADO x2',
    descripcion: `La UNIT equipada con esta AMMO duplica el valor del dado lanzado, después de activar se descarta esta AMMO.`
  },
  {
    nombre: 'BOMB',
    descripcion: `La UNIT equipada con esta AMMO no puede activar ninguna SKILLS, 
        si la UNIT utiliza alguna SKILL se activa una explosión que se realiza de esta manera:
        Elimina a las UNIT de alrededor, si no se activa la AMMO seguirá equipada a la UNIT, 
        cuando se activa se descarta esta AMMO.`,
    componente: <img src={atkBombImg} alt="Ejemplo de BOMB" style={{ maxWidth: '300px', margin: '10px 0' }} />  
  },
  {
    nombre: 'ELITE CARD',
    descripcion: `La UNIT equipada con esta AMMO puede buscar en la zona de TROOP CARDS una ELITE CARD y la añade a tu mano, después se baraja el TROOP CARDS, cuando se activa se descarta esta AMMO.`
  },
  {
    nombre: 'FALSE',
    descripcion: `La UNIT equipada con esta AMMO al momento de obtenerlo pierdes tu turno, el COST que tenías pasa a control del rival junto con el control de las UNIT hasta que se acabe el COST que tenías, el efecto se activa en el momento que la UNIT se le equipa esta AMMO, después de activar se descarta esta AMMO.`
  },
  {
    nombre: 'ATK +',
    descripcion: `La UNIT equipada con esta AMMO puede realizar un ATK SILENCE:
        Elimina a una UNIT adyacente a la UNIT equipada con esta AMMO, 
        este ATK SILENCE no consume COST de los que posee el jugador, cuando se activa se descarta esta AMMO.`,
    componente: <img src={atkSilenceImg} alt="Ejemplo de ATK SILENCE" style={{ maxWidth: '300px', margin: '10px 0' }} />
  },
  {
    nombre: 'NOT ATK',
    descripcion: `La UNIT equipada con esta AMMO no puede realizar ningún ATK o ESPECIAL que sea de ATK del listado de SKILLS, 
        esta AMMO se activa cuando está equipada, se descarta la misma cuando la UNIT es eliminada.`
  },
  {
    nombre: 'KING CARD',
    descripcion: `La UNIT equipada con esta AMMO puede tomar una KING CARD de la zona de KING CARDS, 
        cuando se activa se descarta esta AMMO.`
  },
  {
    nombre: 'NOT EXP',
    descripcion: `La UNIT equipada con esta AMMO descarta una KING CARD de tu mano al TRASH, 
        se activa el efecto cuando se equipa el AMMO, cuando se activa se descarta esta AMMO.`
  },
  {
    nombre: 'DADO +3',
    descripcion: `La UNIT equipada con esta AMMO añade +3 al valor del dado lanzado, después de activar se descarta esta AMMO.`
  },
  {
    nombre: 'TARGET',
    descripcion: `La UNIT equipada con esta AMMO será marcada con el TARGET en la posición que se encuentre mientras 
        tenga equipada esta AMMO, cuando se activa se descarta esta AMMO.`
  },
  {
    nombre: 'RARE CARD',
    descripcion: `La UNIT equipada con esta AMMO puede buscar en la zona de TROOP CARDS una RARE CARD y la añade a tu mano, 
        después se baraja el TROOP CARDS, cuando se activa se descarta esta AMMO.`
  },
  {
    nombre: 'INFILTRATION',
    descripcion: `La UNIT equipada con esta AMMO al momento de obtenerlo pierdes tu turno, 
        el COST que tenías pasa a control del rival, el efecto se activa en el momento que la UNIT se le equipa esta AMMO, 
        después de activar se descarta esta AMMO.`
  },
  {
    nombre: 'ATK EXTRA',
    descripcion: `La UNIT equipada con esta AMMO puede realizar un ATK o ESPECIAL que realice un ATK de su listado de SKILLS, 
        este ATK EXTRA no consume COST, cuando se activa se descarta esta AMMO.`
  },
  {
    nombre: 'MOV LESS',
    descripcion: `La UNIT equipada con esta AMMO al realizar un MOV o ESPECIAL que realice un MOV de su listado de SKILLS, 
        este consume COST x2, esta AMMO se activa cuando está equipada, se descarta la misma cuando la UNIT es eliminada.`
  },
  {
    nombre: 'REPEAT',
    descripcion: `La UNIT equipada con esta AMMO puede tomar la última CARD usada en el TRASH y añadirla a tu mano, 
        cuando se activa se descarta esta AMMO.`
  },
  {
    nombre: 'LOST EXP',
    descripcion: `La UNIT equipada con esta AMMO tiene que tomar una KING CARD de la zona de KINGS CARDS al TRASH, 
        esta AMMO se activa cuando está equipada, cuando se activa se descarta esta AMMO.`
  },
  {
    nombre: 'SHIELD',
    descripcion: `La UNIT equipada con esta AMMO no es destruida por un ATK que el rival realice contra la UNIT, 
        esta AMMO se descarta y la UNIT no es destruida.`
  },
  {
    nombre: 'NOT MOV/ATK',
    descripcion: `La UNIT equipada con esta AMMO no puede realizar ningún MOV ni ATK pero sí puede realizar los ESPECIAL, 
        se descarta la misma cuando la UNIT es eliminada.`
  },
  {
    nombre: 'COMMON CARD',
    descripcion: `La UNIT equipada con esta AMMO puede buscar en la zona de TROOP CARDS una COMMON CARD y la añade a tu mano, 
        después se baraja el TROOP CARDS, cuando se activa se descarta esta AMMO.`
  },
  {
    nombre: 'LOST TROOP',
    descripcion: `La UNIT equipada con esta AMMO tiene que tomar una TROOP CARD de la zona de TROOP CARDS al TRASH, 
        esta AMMO se activa cuando está equipada, cuando se activa se descarta esta AMMO.`
  },
  {
    nombre: 'MOV EXTRA',
    descripcion: `La UNIT equipada con esta AMMO puede realizar un MOV o ESPECIAL que realice un MOV de su listado de SKILLS, 
        esté MOV EXTRA no consume COST, cuando se activa se descarta esta AMMO.`
  },
  {
    nombre: 'LOST TURN',
    descripcion: `La UNIT equipada con esta AMMO al momento de obtenerlo pierdes tu turno y comienza el del rival, 
        el efecto se activa en el momento que la UNIT se le equipa esta AMMO, después de activar se descarta esta AMMO.`
  },
  {
    nombre: 'DADO +1',
    descripcion: `La UNIT equipada con esta AMMO añade +1 al valor del dado lanzado, después de activar se descarta esta AMMO.`
  },
  {
    nombre: 'LOST UNIT',
    descripcion: `La UNIT equipada con esta AMMO es eliminada del tablero del juego, cuando se activa se descarta esta AMMO.`
  },
];

const secciones = [
  {
    titulo: 'SKILLS',
    detalles: skillsDetalles
  },
  {
    titulo: 'KING CARDS',
    detalles: kingCardDetalles
  },
  {
    titulo: 'AMMO',
    detalles: ammoDetalles
  }
];

const GuiaConsulta = () => {
  const navigate = useNavigate();
  const [seleccion, setSeleccion] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [modalSkill, setModalSkill] = useState(null);

  // Filtrar skills o king cards por nombre según la sección seleccionada
  const detallesFiltrados = (() => {
    if (secciones[seleccion]?.titulo === 'SKILLS') {
      return skillsDetalles.filter(skill =>
        skill.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
    }
    if (secciones[seleccion]?.titulo === 'KING CARDS') {
      return kingCardDetalles.filter(card =>
        card.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
    }
    if (secciones[seleccion]?.titulo === 'AMMO') {
        return ammoDetalles.filter(ammo =>
            ammo.nombre.toLowerCase().includes(busqueda.toLowerCase())
        );
    }
    return secciones[seleccion]?.detalles || [];
  })();

  const handleVolver = () => {
    setSeleccion(null);
    setBusqueda("");
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center">Guía de Consulta <span style={{color:'red'}}>TEST</span></h1>
      {!seleccion && (
        <>
          <p>
            Haz clic en una sección para ver el detalle de <strong>SKILLS</strong>, <strong>KING CARDS</strong> o <strong>AMMO</strong>.
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
          {(secciones[seleccion].titulo === 'SKILLS' ||
            secciones[seleccion].titulo === 'KING CARDS' ||
            secciones[seleccion].titulo === 'AMMO') ? (
            <>
              <Form.Control
                type="text"
                placeholder={`Buscar ${
                  secciones[seleccion].titulo === 'SKILLS'
                    ? 'skill'
                    : secciones[seleccion].titulo === 'KING CARDS'
                    ? 'king card'
                    : 'ammo'
                } por nombre...`}
                className="mb-3"
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
              />
              <ul>
                {detallesFiltrados.length > 0 ? (
                  detallesFiltrados.map((detalle, i) => (
                    <li
                      key={i}
                      style={{ cursor: 'pointer', textDecoration: 'underline' }}
                      onClick={() => setModalSkill(detalle)}
                    >
                      {detalle.nombre} {detalle.limit ? <span style={{ color: '#888' }}>(LIMIT {detalle.limit})</span> : null}
                    </li>
                  ))
                ) : (
                  <li>No se encontraron resultados.</li>
                )}
              </ul>
              <Modal show={!!modalSkill} onHide={() => setModalSkill(null)} centered>
                <Modal.Header closeButton>
                  <Modal.Title>
                    {modalSkill?.nombre} {modalSkill?.limit ? <span style={{ color: '#888', fontSize: '0.9em' }}>(LIMIT {modalSkill.limit})</span> : null}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ whiteSpace: 'pre-line' }}>
                  {modalSkill?.descripcion}
                  {modalSkill?.componente && (
                    <div className="mt-3">
                      {modalSkill.componente}
                    </div>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setModalSkill(null)}>
                    Cerrar
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          ) : (
            <ul>
              {secciones[seleccion].detalles.map((detalle, i) => (
                <li key={i}>{detalle}</li>
              ))}
            </ul>
          )}
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