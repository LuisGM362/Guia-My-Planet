import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import movImg from './assets/imagenes/mov.jpg';

function GuiaTurno() {
  const navigate = useNavigate();

  const handleVolver = () => {
    navigate('/');
  };

  return (
    <Container className="mt-0 pt-0">
      <h1 className="text-center">Guia de Turno</h1>
      <h2>Inicio:</h2>
      <p className="text-center">
        <strong>Paso Lanzamiento:</strong>
        <br />
        Cada inicio de turno tira el dado, si sale el numero 1 puedes tomar una 
        <strong>KING CARD</strong> o <strong>TROOP CARD</strong> y luego vuelve a lanzar el dado, hasta que sea distinto de 1.
        <br />
        <strong>Paso Activar Cartas:</strong>
        <br />
        Puedes activar de tu mano una  o varias <strong>CARD</strong> sin importar el orden de ejecucion,
        Luego de usar las <strong>KING CARD</strong> cada una va a la zona de <strong>TRASH</strong>, si es una 
        <strong>TROOP CARD</strong> se debe ubicar en la zona <strong>TROOP LIST</strong> y la <strong>UNIT</strong> 
        se ubica en el <strong>POINT</strong> si no esta ocupado por otra <strong>UNIT</strong>.
        <br />
        <strong>Paso Usar Costo:</strong>
        El numero que sacaste al tirar tu dado se denomina <strong>COST</strong>.
        En tu turno puedes usar los <strong>COST</strong> del dado para activar las <strong>SKILLS</strong> de las 
        <strong>UNIT</strong>, hasta que se te acaben.
        <br />
        <strong>Paso Activar Unit:</strong>
        <br />
        Hay piezas en el juego que llevan el nombre de <strong>UNIT</strong>. 
        Estas <strong>UNIT</strong> están detalladas en cartas llamadas <strong>TROOP CARD</strong>, 
        cada <strong>TROOP CARD</strong> está dividida por TYPE:
        <br />
        <strong>COMMON CARD:</strong> denotada con la letra C.<br />
        <strong>RARE CARD:</strong> denotada con la letra R.<br />
        <strong>ELITE CARD:</strong> denotada con la letra E.<br />
        <strong>KING CARD:</strong> denotada con la letra KC.<br />
        <strong>KING:</strong> denotada con la letra K.<br /><br />
        Cada <strong>TROOP CARD</strong> posee <strong>NAME</strong>, en este se describe el nombre de la <strong>UNIT</strong>.
        <br />
        Cada <strong>TROOP CARD</strong> posee <strong>UNIT MAX</strong>, este indica la cantidad máxima de piezas 
        que pueden haber en el tablero en el momento del juego, la <strong>UNIT KING</strong> es <strong>UNIQUE</strong>.
        <br />
        Cada <strong>TROOP CARD</strong> posee <strong>EQUIP MAX</strong>, esta describe cuántas <strong>AMMO</strong> puede llevar 
        equipada la pieza en el tablero.
        <br />
        Cada <strong>TROOP CARD</strong> posee <strong>SKILLS</strong>, estas son detalladas de la siguiente forma:
        <br />
            <strong>MOV:</strong> esto indica el movimiento que puede realizar la pieza dentro del tablero de juego, 
        el movimiento está indicado de la siguiente forma: la flecha indica la dirección donde la pieza 
        se puede mover en el tablero, dependiendo del tamaño de la flecha será el rango de movimiento de la misma pieza.
        <img src={movImg} alt="Ejemplo de movimiento" style={{ maxWidth: '300px', margin: '10px 0' }} />
        <br /> 
        la flecha indica que la pieza puede hacer movimiento.
        <br />
            <strong>ATK:</strong> esto indica el ataque que puede realizar la pieza dentro del tablero hacia otra pieza,
        la x indica la posición de la pieza que será eliminada del tablero: 
        la x indica en qué posición debe estar una pieza para que sea eliminada por esta <strong>UNIT</strong>, 
        cuando la <strong>UNIT</strong> realiza un <strong>ATK</strong> hace que se active el <strong>TARGET</strong> del 
        rival en la posición de la <strong>UNIT</strong> que realizó el <strong>ATK</strong>. 
        Al final de realizar el <strong>ATK</strong> la <strong>UNIT</strong> no se mueve del lugar 
        al menos que se realice un <strong>MOV</strong>, si se efectúa un <strong>ATK SILENCE</strong> no 
        hará que se active el <strong>TARGET</strong>.
        <br />
            <strong>ESPECIAL:</strong> esto indica ya sea un <strong>MOV o ATK o SKILL</strong>, 
        las <strong>SKILL</strong> pueden usarse con el <strong>COST</strong> indicado en el detalle de la carta.
        <br />
        Cada <strong>TROOP CARD</strong> posee <strong>COST</strong>, 
        esto determina cuántos puntos de dado son necesarios para realizar alguna activación de las <strong>SKILLS</strong>.
        <br />
        <strong>Paso Fin de turno:</strong>
        <br />
        Cuando se termina el turno debes tener solo maximo 3 <strong>CARD</strong> en tu mano.
      </p>
      <p className="text-center">Fin de la guia de turno.</p>
      <div className="fixed-bottom bg-light py-2 border-top text-center">
        <Button variant="secondary" onClick={handleVolver}>
          ← Volver inicio
        </Button>
      </div>
    </Container>
  );
}

export default GuiaTurno;