import React, { useState } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import { MDBInput } from 'mdb-react-ui-kit';


const CardLogin = ({ setUsername, setPassword, onLogin }) => {
  
  return (
    <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
      <Card className='shadow-lg border-0 rounded-9'>
        <Form className='ps-5 pe-5 pt-4 pb-4 ms-3 me-3' onSubmit={onLogin}>
          <h3 className="fw-bold text-primary text-center pb-3">Login</h3>
          <MDBInput
            className='mb-3'
            label='Username'
            id='form1'
            type='text'
            onChange={(e) => setUsername(e.target.value)} // Memperbarui username saat input berubah
          />
          <MDBInput
            label='Password'
            id='form2'
            type='password'
            onChange={(e) => setPassword(e.target.value)} // Memperbarui password saat input berubah
          />
          <div className='text-center pt-3'>
            <Button className='rounded-pill mt-2' variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default CardLogin;
