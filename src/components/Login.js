import React from 'react';
import { Form, Button } from "semantic-ui-react";

const Login = () => {
  return (
    <div className="center">
      <Form className="center" style={{ margin: 100 }}>
        <Form.Field>
          <label>Username</label>
          <input placeholder="Username" />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input placeholder="Password" />
        </Form.Field>
          <Button type="submit">Login</Button>
      </Form>
    </div>
  )
}

export default Login 