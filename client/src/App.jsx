import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card } from 'react-bootstrap';

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
    <Container className="mt-2 text-center">
      <h1>My Planet Guide</h1>
      <Row className="justify-content-center">
        {opciones.map((opcion, index) => (
          <Col key={index} sm={4} className="d-flex justify-content-center">
            <Card className="m-2 text-center" style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>{opcion}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;