import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Form, Button } from "semantic-ui-react";

const Login = ({ setUser }) => {

  const [login, setLogin] = useState({})
  const history = useHistory()

  const URL = "http://localhost:3000/login"

  const handleChange = (e) => {
    e.persist()
    setLogin(login => ({...login, [e.target.name]: e.target.value}))
  }

  //////handle login
  const handleSubmit = (e) => {
    e.preventDefault()
  
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Accept": 'application/json'
      },
      body: JSON.stringify({
        username: login.username,
        password: login.password
      })
    })
    .then(res => res.json())
    //.then(data => console.log(data))
    .then(data => {
      localStorage.setItem("token", data.token)
      setUser({ user: data.id })
      ////// redirect
      history.push({ pathname: "/"})
    })
  }

  return (
    <div className="center">
      <Form className="center" onSubmit={handleSubmit} style={{ margin: 100 }}>
        <Form.Field>
          <label>Username</label>
          <input 
            name="username"
            value={login.username}
            onChange={handleChange}
            placeholder="Username" />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input 
            name="password"
            type="password"
            value={login.password}
            onChange={handleChange}
            placeholder="Password" />
        </Form.Field>
          <Button type="submit">Login</Button>
      </Form>
    </div>
  )
}

export default Login