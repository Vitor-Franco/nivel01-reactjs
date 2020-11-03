import React, { useState, useEffect } from 'react';

import api from './services/api';
import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    // TODO
    const { data } = await api.post('/repositories', {
      title: 'Campo Minado',
      url: 'github.com',
      techs: ['NodeJS', 'React-Native'],
    });
    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`/repositories/${id}`);
    const indexRepositoryRemoved = repositories.filter(
      (repository) => repository.id !== id
    );
    setRepositories([...indexRepositoryRemoved]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({ id, title }) => (
          <li key={id}>
            <h3>{title}</h3>
            <button onClick={() => handleRemoveRepository(id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
