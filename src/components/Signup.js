import React from 'react';
import { Form, Input, Select, Button } from "semantic-ui-react";

const Signup = () => {

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
      <Form style={{ margin: 100 }}>
        <Form.Group className="username-password">
          <Form.Field control={Input} label='Username' placeholder='Username'width={5}/>
          <Form.Field control={Input} label='Password' placeholder='Password'width={5}/>
        </Form.Group>

        <Form.Group className="name-email">
          <Form.Field control={Input} label='First Name' placeholder='Name'width={4}/>
          <Form.Field control={Input} label='Email' placeholder='example@gmail.com'width={6}/>
        </Form.Group>

        <Form.Group className="city-state">
          <Form.Field control={Input} label='City' placeholder='City'width={4}/>
          <Form.Field control={Select} options={states} label='State' placeholder='State'width={1}/>
        </Form.Group>

        <Form.Field control={Button}>Submit</Form.Field>
      </Form>
    </div>
  )
}

export default Signup
