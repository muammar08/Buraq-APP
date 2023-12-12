import React, { useState } from 'react';
import CardLogin from "../Cards/CardLogin";
import axios from 'axios';
import Swal from 'sweetalert2';
import BASE_URL from '../../config';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      // Tampilkan SweetAlert jika username atau password kosong
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Username dan Password harus diisi!',
      });
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/login`, {
        username: username,
        password: password,
      });

      if (response.status === 200){
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', response.data.data.role_id);
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('user');

       
        if (role === '1' && token !== null) {
            window.location.href = '/dashboardAdmin';
        } else if (role === '2' && token !== null) {
            window.location.href = '/dashboardAdminDaerah';
        } else if (role === '3' && token !== null) {
            window.location.href = '/dashboardSuplier';
        } else if (role === '4' && token !== null) {
            window.location.href = '/dashboardKurir';
        }
      }
      // Handle respons API login sesuai kebutuhan Anda.
      
    } catch (error) {
      // Handle kesalahan saat login
      console.error('Gagal melakukan login', error);
      // Tampilkan SweetAlert jika terjadi kesalahan saat login
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Username atau Password Salah!',
      });
    }
  }

  function cekRoleToken() {
    const role = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (role === '1' && token !== null) {
        window.location.href = '/dashboardAdmin';
    } else if (role === '2' && token !== null) {
        window.location.href = '/dashboardAdminDaerah';
    } else if (role === '3' && token !== null) {
        window.location.href = '/dashboardSuplier';
    } else if (role === '4' && token !== null) {
        window.location.href = '/dashboardKurir';
    }
  }

  return (
    <div>
      {cekRoleToken()}
      <CardLogin
        onLogin={handleLogin}
        setUsername={setUsername}
        setPassword={setPassword}
      />
    </div>
  );
}

export default Login;
