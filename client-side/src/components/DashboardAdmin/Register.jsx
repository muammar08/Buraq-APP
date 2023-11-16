import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { MDBInput } from 'mdb-react-ui-kit';
import { Button, ButtonGroup, Form } from 'react-bootstrap';
import axios from 'axios'; // Impor Axios untuk melakukan permintaan HTTP
import Swal from 'sweetalert2';

// const isAuthenticated = () => {
//   const token = localStorage.getItem('token');
//   return token !== null;
// }

function Register() {
  
    const [userData, setUserData] = useState(null); // State untuk menyimpan data pengguna

   const [registrationType, setRegistrationType] = useState('Kurir');

    const handleRegistrationTypeChange = (type) => {
        setRegistrationType(type);
    }

    const token = localStorage.getItem('token');    

    const [username, setUsername] = useState('');
    const [namaSuplier, setNamaSuplier] = useState('');
    const [roleIdSuplier, setRoleIdSuplier] = useState(2);
    const [roleIdKurir, setRoleIdKurir] = useState(3);
    const [password, setPassword] = useState('');
    const [namaKurir, setNamaKurir] = useState('');
    const [nohpKurir, setNoHpKurir] = useState('');
    const [alamatKurir, setAlamatKurir] = useState('');

    const handleRegistSuplier = async (e) => {
        e.preventDefault();

        if (password.length < 6 || password.length > 20) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Password',
                text: 'Password must be between 6 and 20 characters.',
            });
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/registersuplier', {
                username: username,
                roleId: roleIdSuplier,
                password: password,
                namaSuplier: namaSuplier,
                }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);

            Swal.fire({
                icon: 'success',
                title: 'Data berhasil disimpan',
                showConfirmButton: false,
                timer: 1000,
              });
        
            
              setTimeout(() => {
                window.location.reload();
            }, 1001);


        } catch (error) {
            console.error('Error', error);
        }
    }

    const handleRegisterKurir = async (e) => {
        e.preventDefault();

        if (password.length < 6 || password.length > 20) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Password',
                text: 'Password must be between 6 and 20 characters.',
            });
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/registerkurir', {
                username: username,
                roleId: roleIdKurir,
                password: password,
                namaKurir: namaKurir,
                nohpKurir: nohpKurir,
                alamatKurir: alamatKurir,
                }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);

            Swal.fire({
                icon: 'success',
                title: 'Data berhasil disimpan',
                showConfirmButton: false,
                timer: 1000,
              });
        
            
              setTimeout(() => {
                window.location.reload();
            }, 1001);

        } catch (error) {
            console.error('Error', error);
        }
    }

  return (
    <div style={{ display: 'flex' }}>
        <Sidebar />
        <div
            className="content"
            style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
            }}
        >
            <div className='d-flex justify-content-center p-5'>
                <ButtonGroup>
                    <Button
                        onClick={() => handleRegistrationTypeChange('Kurir')}
                        variant={registrationType === 'Kurir' ? 'primary' : 'secondary'}
                        style={{ backgroundColor: registrationType === 'Kurir' ? '#1d3357' : '' }}
                    >
                        Kurir
                    </Button>
                    <Button 
                        onClick={() => handleRegistrationTypeChange('Suplier')}
                        variant={registrationType === 'Suplier' ? 'primary' : 'secondary'}
                        style={{ backgroundColor: registrationType === 'Suplier' ? '#1d3357' : '' }}
                    >
                        Suplier
                    </Button>
                </ButtonGroup>
            </div>
            <div>
                {registrationType === 'Suplier' && (
                    <Form className='pt-3 ps-5 pe-5' onSubmit={handleRegistSuplier}>
                        <h2>Register Suplier</h2>
                        <MDBInput className='mb-4 mt-4' label='Nama Suplier' id='namaSuplier' name='namaSuplier' type='text' onChange={(e) => setNamaSuplier(e.target.value)} />
                        <MDBInput className='mb-4' label='Username' id='username' name='username' type='text' onChange={(e) => setUsername(e.target.value)}/>
                        <MDBInput className='mb-5' label='Password' id='password' name='password' type='password' onChange={(e) => setPassword(e.target.value)}/>
                        <input name='roleId' type='text' id='roleId' hidden onChange={(e) => setRoleIdSuplier(e.target.value)} />
                        <div className="text-end">
                            <Button className="fw-bold pt-3 pb-3 ps-4 pe-4 rounded-pill" type="submit" style={{ background: '#1d3557' }}>
                                Simpan Data
                            </Button>
                        </div>
                    </Form>
                )}
                {registrationType === 'Kurir' && (
                    <Form className='pt-3 ps-5 pe-5' onSubmit={handleRegisterKurir}>
                        <h2>Register Kurir</h2>
                        <MDBInput className='mb-4 mt-4' label='Nama Kurir' id='namaKurir' name='namaKurir' type='text' onChange={(e) => setNamaKurir(e.target.value)}/>
                        <MDBInput className='mb-4' label='Username' id='username'  type='text' onChange={(e) => setUsername(e.target.value)}/>
                        <input name='roleId' value='3' type='text' id='roleId' hidden onChange={(e) => setRoleIdKurir(e.target.value)} />
                        <MDBInput className='mb-4' label='No HP Kurir' id='nohpKurir' name='nohpKurir' type='text' onChange={(e) => setNoHpKurir(e.target.value)}/>
                        <MDBInput className='mb-4' label='Alamat Kurir' id='alamatKurir' name='alamatKurir' type='text' onChange={(e) => setAlamatKurir(e.target.value)}/>
                        <MDBInput className='mb-5' label='Password' id='password' type='password' onChange={(e) => setPassword(e.target.value)}/>
                        <div className="text-end">
                            <Button className="fw-bold pt-3 pb-3 ps-4 pe-4 rounded-pill" type="submit" style={{ background: '#1d3557' }}>
                                Simpan Data
                            </Button>
                        </div>
                    </Form>
                )}
            </div>
        </div>
    </div>
);
}

export default Register;
