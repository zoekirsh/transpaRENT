import React, { useState } from 'react';
import { Form, Input, Dropdown, Button } from "semantic-ui-react";

const Signup = ({ setUser }) => {

  const [inputs, setInputs] = useState({ username: "", password: "", name: "", email: "", city: "", state: ""})
  const URL = "http://localhost:3000/signup"

  const handleInputChange = (e, value) => {
    e.persist()
    setInputs(inputs => ({...inputs, [e.target.name]: value.value}))
  }

  const handleSelect = (e, value) => {
    e.persist()
    setInputs({...inputs, state: value.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    //debugger
    //POST user data to new user
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify( inputs )
    })
    .then(res=> res.json())
    // .then(console.log)
    .then(newUser => {
      localStorage.setItem("token", newUser.token)
      setUser({ user: newUser })
      //redirect
      console.log("now redirect to... /profile")
    })

  }

  const states = [
    { text: "AL", value: "AL" }, { text: "AK", value: "AK" }, { text: "AZ", value: "AZ" }, 
    { text: "AR", value: "AR" }, { text: "CA", value: "CA" }, { text: "CO", value: "CO" }, 
    { text: "CT", value: "CT" }, { text: "DE", value: "DE" }, { text: "FL", value: "FL" }, 
    { text: "GA", value: "GA" }, { text: "HI", value: "HI" }, { text: "ID", value: "ID" }, 
    { text: "IN", value: "IN" }, { text: "IA", value: "IA" }, { text: "KS", value: "KS" }, 
    { text: "KY", value: "KY" }, { text: "LA", value: "LA" }, { text: "ME", value: "ME" }, 
    { text: "MD", value: "MD" }, { text: "MA", value: "MA" }, { text: "MI", value: "MI" }, 
    { text: "MN", value: "MN" }, { text: "MS", value: "MS" }, { text: "MO", value: "MO" }, 
    { text: "MT", value: "MT" }, { text: "NE", value: "NE" }, { text: "NV", value: "NV" }, 
    { text: "NH", value: "NH" }, { text: "NJ", value: "NJ" }, { text: "NM", value: "NM" }, 
    { text: "NY", value: "NY" }, { text: "NC", value: "NC" }, { text: "ND", value: "ND" }, 
    { text: "OH", value: "OH" }, { text: "OK", value: "OK" }, { text: "OR", value: "OR" }, 
    { text: "PA", value: "PA" }, { text: "RI", value: "RI" }, { text: "SC", value: "SC" }, 
    { text: "SD", value: "SD" }, { text: "TN", value: "TN" }, { text: "TX", value: "TX" },  
    { text: "UT", value: "UT" }, { text: "VT", value: "VT" }, { text: "VA", value: "VA" }, 
    { text: "WA", value: "WA" }, { text: "WV", value: "WV" }, { text: "WI", value: "WI" }, 
    { text: "WY", value: "WY" }
  ]

  return (
    <div className="signup">
      <Form onSubmit={handleSubmit} style={{ margin: 100 }}>
        <Form.Group className="username-password">
          <Form.Field control={Input} onChange={handleInputChange} label='Username' name="username" value={inputs.username} placeholder='Username' width={5} required/>
          <Form.Field control={Input} onChange={handleInputChange} type="password" label='Password' name="password" value={inputs.password} placeholder='Password' width={5} required/>
        </Form.Group>

        <Form.Group className="name-email">
          <Form.Field control={Input} onChange={handleInputChange} label='First Name' name="name" value={inputs.name} placeholder='Name' width={4} required/>
          <Form.Field control={Input} onChange={handleInputChange} label='Email' name="email" value={inputs.email} placeholder='example@gmail.com' width={6} required/>
        </Form.Group>

        <Form.Group className="city-state">
          <Form.Field control={Input} onChange={handleInputChange} label='City' name="city" value={inputs.city} placeholder='City' width={4} required/>
          <Form.Field required>
            <label>State</label>
            <Dropdown selection options={states} onChange={handleSelect} label='State' name="state" value={inputs.state} placeholder='State' width={1}/>
          </Form.Field>
        </Form.Group>

        <Form.Field control={Button}>Submit</Form.Field>
      </Form>
    </div>
  )
}

export default Signup
