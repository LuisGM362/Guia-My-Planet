import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

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
    <div>
      <h1>My Planet Guide</h1>
      <h2>Opciones</h2>
      <ul>
        {opciones.map((opcion, index) => (
          <li key={index}>{opcion}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;