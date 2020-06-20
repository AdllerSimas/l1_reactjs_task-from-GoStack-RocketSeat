import React, {useState, useEffect} from "react";
import api from './services/api'
import "./styles.css";



function App() {
  
  const [repositories, setRepositories] = useState([])

  useEffect( () => {
    api.get(`/repositories`).then( resp => {
      setRepositories(resp.data)
    })
  },[])

  useEffect( () => {
    api.get(`/repositories`).then( resp => {
      setRepositories(resp.data)
    })
  },[repositories])

  
  
  async function handleAddRepository() {
    
    const response = await api.post('/repositories', {
      
      title: `New Repository ${Date.now()}`,
      owner: "Me",
      url:"https://findRepositories",
      techs:['nodejs', 'reactjs']
    })

    const repository = response.data

    setRepositories([...repositories, repository])
  
  }

  async function handleRemoveRepository(id) {
    
    api.delete(`/repositories/${id}`).then( response => {
        
        api.get('/repositories').then(response => {
          setRepositories(response.data)
        })  
    
    }).catch(err => {
      console.log(err)
    })
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
          { 
            repositories.map(( repository  => (
              
              <li key={repository.id}>{repository.title} <span><button onClick={() => handleRemoveRepository(repository.id)}> Remover </button></span> </li>
                      
            ))
            )
          }   
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

