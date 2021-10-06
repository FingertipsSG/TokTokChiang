import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {useState, useEffect} from 'react'
import Login from './Components/Login';
import SignUp from './Components/SignUp'

function App() {
  let fetchUrl = '/api';
  async function fetchApi(url) {
    fetch(url)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      console.log(data)
    })
    .catch((err) => {
      // Do something for an error here
    })
  }

  useEffect(()=> {
    fetchApi(fetchUrl);
  }, [])

  return (
    <div className="App">
      <SignUp />
    </div>
  );
}

export default App;