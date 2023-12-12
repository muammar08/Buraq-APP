import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import {MDBInput } from 'mdb-react-ui-kit';
import { Button, ButtonGroup, Form } from 'react-bootstrap';
import axios from 'axios'; // Impor Axios untuk melakukan permintaan HTTP
import Swal from 'sweetalert2';
import Select from 'react-select';
import BASE_URL from '../../config';

// const isAuthenticated = () => {
//   const token = localStorage.getItem('token');
//   return token !== null;
// }

function Register() {

    const daerahOptions = [
        { label: 'Kabupaten Aceh Barat', value: 'Kabupaten Aceh Barat' },
        { label: 'Kabupaten Aceh Barat Daya', value: 'Kabupaten Aceh Barat Daya' },
        { label: 'Kabupaten Aceh Besar', value: 'Kabupaten Aceh Besar' },
        { label: 'Kabupaten Aceh Jaya', value: 'Kabupaten Aceh Jaya' },
        { label: 'Kabupaten Aceh Selatan', value: 'Kabupaten Aceh Selatan' },
        { label: 'Kabupaten Aceh Singkil', value: 'Kabupaten Aceh Singkil' },
        { label: 'Kabupaten Aceh Tamiang', value: 'Kabupaten Aceh Tamiang' },
        { label: 'Kabupaten Aceh Tengah', value: 'Kabupaten Aceh Tengah' },
        { label: 'Kabupaten Aceh Tenggara', value: 'Kabupaten Aceh Tenggara' },
        { label: 'Kabupaten Aceh Timur', value: 'Kabupaten Aceh Timur' },
        { label: 'Kabupaten Aceh Utara', value: 'Kabupaten Aceh Utara' },
        { label: 'Kabupaten Bener Meriah', value: 'Kabupaten Bener Meriah' },
        { label: 'Kabupaten Bireuen', value: 'Kabupaten Bireuen' },
        { label: 'Kabupaten Gayo Lues', value: 'Kabupaten Gayo Lues' },
        { label: 'Kabupaten Nagan Raya', value: 'Kabupaten Nagan Raya' },
        { label: 'Kabupaten Pidie', value: 'Kabupaten Pidie' },
        { label: 'Kabupaten Pidie Jaya', value: 'Kabupaten Pidie Jaya' },
        { label: 'Kabupaten Simeulue', value: 'Kabupaten Simeulue' },
        { label: 'Kota Banda Aceh', value: 'Kota Banda Aceh' },
        { label: 'Kota Langsa', value: 'Kota Langsa' },
        { label: 'Kota Lhokseumawe', value: 'Kota Lhokseumawe' },
        { label: 'Kota Sabang', value: 'Kota Sabang' },
        { label: 'Kota Subulussalam', value: 'Kota Subulussalam' },
    ];

    const [selectedDaerah, setSelectedDaerah] = useState(null);

    const handleDaerahChange = (selectedOption) => {
        setSelectedDaerah(selectedOption);
        console.log(`Selected: ${selectedOption.label}`);
    };

    const customStyles = {
        control: (provided) => ({
            ...provided,
            minWidth: 200,
            margin: '8px 0',
        }),
    };
  
   const [userData, setUserData] = useState(null); // State untuk menyimpan data pengguna

   const [registrationType, setRegistrationType] = useState('Kurir');

    const handleRegistrationTypeChange = (type) => {
        setRegistrationType(type);
    }

    const token = localStorage.getItem('token');    

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [roleIdAdmin, setRoleIdAdmin] = useState(2);
    const [roleIdSuplier, setRoleIdSuplier] = useState(3);
    const [roleIdKurir, setRoleIdKurir] = useState(4);
    const [namaSuplier, setNamaSuplier] = useState('');
    const [namaKurir, setNamaKurir] = useState('');
    const [nohpKurir, setNoHpKurir] = useState('');
    const [alamatKurir, setAlamatKurir] = useState('');
    const [adminDaerah, setAdminDaerah] = useState('');

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
            const response = await axios.post(`${BASE_URL}/api/registersuplier`, {
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
            const response = await axios.post(`${BASE_URL}/api/registerkurir`, {
                username: username,
                roleId: roleIdKurir,
                password: password,
                namaKurir: namaKurir,
                nohpKurir: nohpKurir,
                alamatKurir: selectedDaerah?.value,
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

    const handleRegistAdminDaerah = async (e) => {
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
            const response = await axios.post(`${BASE_URL}/api/registeradmin`, {
                username: username,
                roleId: roleIdAdmin,
                password: password,
                adminDaerah: adminDaerah,
                daerah: selectedDaerah?.value,
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
                    <Button 
                        onClick={() => handleRegistrationTypeChange('Admin Daerah')}
                        variant={registrationType === 'Admin Daerah' ? 'primary' : 'secondary'}
                        style={{ backgroundColor: registrationType === 'Admin Daerah' ? '#1d3357' : '' }}
                    >
                        Admin Daerah
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
                        <Select
                            className='mb-4'
                            options={daerahOptions}
                            value={selectedDaerah}
                            onChange={handleDaerahChange}
                            placeholder="Pilih Daerah"
                            styles={customStyles}
                            isClearable
                            isSearchable
                        />
                        <MDBInput className='mb-5' label='Password' id='password' type='password' onChange={(e) => setPassword(e.target.value)}/>
                        <div className="text-end">
                            <Button className="fw-bold pt-3 pb-3 ps-4 pe-4 rounded-pill" type="submit" style={{ background: '#1d3557' }}>
                                Simpan Data
                            </Button>
                        </div>
                    </Form>
                )}
                {registrationType === 'Admin Daerah' && (
                    <Form className='pt-3 ps-5 pe-5' onSubmit={handleRegistAdminDaerah}>
                        <h2>Register Suplier</h2>
                        <MDBInput className='mb-4 mt-4' label='Nama Admin Daerah' id='' name='adminDaerah' type='text' onChange={(e)=> setAdminDaerah(e.target.value)}/>
                        <MDBInput className='mb-4' label='Username' id='username' name='username' type='text' onChange={(e) => setUsername(e.target.value)}/>
                        <MDBInput className='mb-4' label='Password' id='password' name='password' type='password' onChange={(e) => setPassword(e.target.value)}/>
                        <input name='roleId' type='text' id='roleId' hidden onChange={(e) => setRoleIdAdmin(e.target.value)} />
                        <Select
                            className='mb-4'
                            options={daerahOptions}
                            value={selectedDaerah}
                            onChange={handleDaerahChange}
                            placeholder="Pilih Daerah"
                            styles={customStyles}
                            isClearable
                            isSearchable
                        />

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
