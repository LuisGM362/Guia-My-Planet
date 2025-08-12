import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Routes, Route, useNavigate } from 'react-router-dom';
import GuiaInicio from './GuiaInicio.jsx';

function App() {
  const [opciones, setOpciones] = useState(["Guia de Inicio", "Guia Consulta", "Guia Victoria"]);
  const navigate = useNavigate();

  // Comentamos el useEffect para probar con valores hardcodeados
  // useEffect(() => {
  //   axios.get('http://localhost:3001/opciones')
  //     .then(response => {
  //       console.log("Opciones recibidas:", response.data);
  //       setOpciones(response.data);
  //     })
  //     .catch(error => {
  //       console.error("Error al obtener opciones:", error);
  //     });
  // }, []);

  const handleClick = (opcion) => {
    if (opcion === "Guia de Inicio") {
      console.log("Navegando a /guia-inicio");
      navigate('/guia-inicio');
    }
    // Aquí podés agregar lógica para otros botones
  };

  return (
    <Routes>
      <Route path="/" element={
        <Container className="mt-0 pt-0">
          <h1 className="text-center">My Planet Guide</h1>
          <Row className="justify-content-center">
            {opciones.map((opcion, index) => (
              <Col key={index} sm={4} className="d-flex justify-content-center">
                <Button variant="primary" className="m-2" onClick={() => handleClick(opcion)}>
                  {opcion}
                </Button>
              </Col>
            ))}
          </Row>
        </Container>
      } />
      <Route path="/guia-inicio" element={<GuiaInicio />} />
    </Routes>
  );
}

export default App;