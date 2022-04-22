import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])
  const handlefromSubmit = event => {
    const name = event.target.name.value;
    const email = event.target.email.value;
    console.log(name, email)
    const user = { name, email }
    event.preventDefault()

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user),
    })
      .then(respons => respons.json())
      .then(data => {
        const newUser = [...users, data]
        setUsers(newUser)
        console.log('success', newUser)
      })

  }

  return (
    <div className="App">
      <h2>My Own data: {users.length}</h2>
      <form onSubmit={handlefromSubmit}>
        <input type="text" name='name' placeholder='name' />
        <input type="email" name='email' placeholder='email' />
        <input type="submit" value="Add users" />
      </form>
      <ul>
        {
          users.map(user => <li key={user.id}>{user.name} {user.Email}</li>)
        }
      </ul>

    </div>
  );
}

export default App;
