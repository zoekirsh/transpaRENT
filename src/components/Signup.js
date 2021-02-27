import React from 'react';
import { Form, Input, Select, Button } from "semantic-ui-react";

const Signup = () => {

  const states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", 
  "FL", "GA", "HI", "ID", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", 
  "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT",
  "VA", "WA", "WV", "WI", "WY"]

  return (
    <div className="signup-form">
      <Form>
        <Form.Group className="username-password">
          <Form.Field control={Input} label='Username' placeholder='Username'width={5}/>
          <Form.Field control={Input} label='Password' placeholder='Password'width={5}/>
        </Form.Group>

        <Form.Group className="name-email">
          <Form.Field control={Input} label='Name' placeholder='Name'width={4}/>
          <Form.Field control={Input} label='City' placeholder='City'width={4}/>
          <Form.Field control={Select} options={states} label='State' placeholder='State'width={1}/>
        </Form.Group>

        <Form.Group className="city-state">
          <Form.Field control={Input} label='Email' placeholder='example@gmail.com'width={6}/>
        </Form.Group>
        
        <Form.Field control={Button}>Submit</Form.Field>
      </Form>
    </div>
  )
}

export default Signup
