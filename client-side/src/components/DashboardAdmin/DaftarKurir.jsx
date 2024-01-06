import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import TableDaftarKurir from '../Tables/TableDaftarKurir';
import axios from 'axios';
import BASE_URL from '../../config';

function DaftarKurir() {
    const token = localStorage.getItem('token');
    const [userRole, setUserRole] = useState([]);

    // Gunakan useEffect untuk mengambil role_id dari API saat komponen dimuat.
    useEffect (() => {
        if (!token) {
          window.location.href = '/';
        } else {
          axios.get(`${BASE_URL}/api/getuser`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "69420",
            },
          })
            .then((response) => {
                setUserRole(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Gagal mengambil data pengguna', error);
                }
            );
        }
        }, [token]);

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div
                className="content"
                style={{
                    flex: 1,
                    justifyContent: 'start',
                }}
            >
               
                
                    <TableDaftarKurir title="Daftar Kurir" />
                
                                  
            </div>
        </div>
    );
}

export default DaftarKurir;
