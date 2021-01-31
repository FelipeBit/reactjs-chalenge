import React, {useEffect, useState} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repos, setRepos] = useState([])

  useEffect(()=>{

    api.get('repositories')
    .then(function (response) {
        setRepos(response.data)
    })
      .catch(function (error) {
        console.log(error);
    })
   },[])

  async function handleAddRepository() {

    api.post('repositories', { title: 'teste', url: 'http', techs: ['Node','React'] })
    .then(function (response) {
        setRepos([...repos, response.data])
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  async function handleRemoveRepository(id) {
     api.get('repositories', {
        params: {
          id
        }
      })
      .then(function (response) {
        console.log(response);
        const reposUpdated = repos.filter(repository => repository.id !== id)
        setRepos(reposUpdated)
      })
      .catch(function (error) {
        console.log(error);
      })

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map(repository=> (<li key={repository.id} >{repository.title} <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button></li>))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
