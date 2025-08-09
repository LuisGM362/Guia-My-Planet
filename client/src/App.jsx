import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';

function App() {
  const [opciones, setOpciones] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/opciones')
      .then(response => {
        setOpciones(response.data);
      })
      .catch(error => {
        console.error("Error al obtener opciones:", error);
      });
  }, []);

  return (
    <Container className="mt-0 pt-0">
      <h1 className="text-center">My Planet Guide</h1>
      <Row className="justify-content-center">
        {opciones.map((opcion, index) => (
          <Col key={index} sm={4} className="d-flex justify-content-center">
            <Button variant="primary" className="m-2">{opcion}</Button>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;