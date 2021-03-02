import React, { useState } from 'react';
import { Form, Button } from "semantic-ui-react";

const Login = ({ setUser }) => {

  const [login, setLogin] = useState({})
  const URL = "http://localhost:3000/login"

  const handleChange = (e) => {
    e.persist()
    setLogin(login => ({...login, [e.target.name]: e.target.value}))
  }

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
    .then(data => {
      localStorage.setItem("token", data.token)
      setUser({ user: data.user })
      //redirect
      console.log("now redirect to.. profile? home? reviews?")
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