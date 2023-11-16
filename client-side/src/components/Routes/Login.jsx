import React, { useState } from 'react';
import CardLogin from "../Cards/CardLogin";
import axios from 'axios';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        username: username,
        password: password,
      });

      if (response.status === 200){

        localStorage.setItem('token', response.data.token);
       
        if (response.data.data.role_id === 1) {
            window.location.href = '/dashboardAdmin';
        } else if (response.data.data.role_id === 2) {
            window.location.href = '/dashboardSuplier';
        } else {
            window.location.href = '/dashboardKurir';
        }
      }
      // Handle respons API login sesuai kebutuhan Anda.
      
    } catch (error) {
      // Handle kesalahan saat login
      console.error('Gagal melakukan login', error);
    }
  }

  return (
    <div>
      <CardLogin
        onLogin={handleLogin}
        setUsername={setUsername}
        setPassword={setPassword}
      />
    </div>
  );
}

export default Login;
