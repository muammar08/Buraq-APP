import React, { useState, useEffect } from 'react';
import BottomBar from './BottomBar';
import { Form, Row, Col, Container, Card } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import BASE_URL from '../../config';

function DashboardAdminDaerah() {
    const token = localStorage.getItem('token');
    const [selectedData, setSelectedData] = useState([]);
    const [selectedBarang, setSelectedBarang] = useState([]);
    const [selectedKurir, setSelectedKurir] = useState(null); // State untuk menyimpan kurir yang dipilih

    const handleCheckboxChange = (e) => {
        const barangId = e.target.value;
        if (e.target.checked) {
            setSelectedBarang([...selectedBarang, barangId]);
        } else {
            setSelectedBarang(selectedBarang.filter((id) => id !== barangId));
        }
    };

    const handleSubmit = async () => {
        try {
          const response = await axios.post(
            `${BASE_URL}/api/setkurir`,
            {
              id_kurir: selectedKurir,
              select: selectedBarang,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response.data); // Use response.data to access the response data
        
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
          console.error('Gagal mengirim data', error);
        }
    };

    useEffect(() => {
        if (token) {
            axios.get(`${BASE_URL}/api/getkuriradmindaerah`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "ngrok-skip-browser-warning": "69420",
                },
            })
                .then((response) => {
                    setSelectedData(response.data.data);
                    console.log(response.data.data);
                })
                .catch((error) => {
                    console.error('Gagal mengambil data kurir', error);
                });
        }
    }, [token]);

    // Fungsi untuk menangani perubahan pada dropdown kurir
    const handleKurirSelect = (e) => {
        const kurirId = e.target.value;
        setSelectedKurir(kurirId);
    };

    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div>
            <div className="fixed-top d-flex justify-content-center bg-white shadow-sm">
                <div className='ms-5 mt-2'>
                    <Row>
                        <h3>Pilih Kurir</h3>
                        <Col xs={7}>
                            <Form.Select value={selectedKurir || ''} aria-label="Default select example" onChange={handleKurirSelect}>
                            <option>Pilih Kurir</option>
                            {Array.isArray(selectedData) ? (
                                selectedData.map((item, index) => (
                                <option key={index} value={item.id_kurir}>
                                    {item.nama_kurir}
                                </option>
                                ))
                            ) : (
                                <option>Tidak ada data</option>
                            )}
                            </Form.Select>
                        </Col>
                        <Col className='mb-3'>
                            <button className="btn btn-primary" onClick={handleSubmit}>
                                Submit
                            </button>
                        </Col>
                    </Row>
                </div>
            </div>

            {/* Tampilkan CardAdminDaerah hanya jika sebuah kurir telah dipilih */}
            <CardAdminDaerah 
                        barangData={selectedBarang}
                        handleCheckboxChange={handleCheckboxChange}
                        searchTerm={searchTerm}
                        />

            <BottomBar setSearchTerm={setSearchTerm} />
        </div>
    )
}

function CardAdminDaerah({ handleCheckboxChange , searchTerm =''}) {

    const token = localStorage.getItem('token');
    const [barangData, setBarangData] = useState([]);
  
    useEffect(() => {
        if (token) {
            axios.get(`${BASE_URL}/api/listdaerah`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "ngrok-skip-browser-warning": "69420",
                },
            })
                .then((response) => {
                    setBarangData(response.data.data);
                    console.log(response.data.data);
                })
                .catch((error) => {
                    console.error('Gagal mengambil data barang', error);
                });
        }
    }, [token]);
  
    const filteredData = barangData.filter((item) =>
    item.nama_barang.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <div>
        <p className='d-flex justify-content-center align-items-center fw-bold'  style={{marginTop:'6.8rem'}}>Barang Suplier</p> 
        <Container className='d-flex justify-content-center align-items-center' >
         {Array.isArray(filteredData) && filteredData.length > 0 ? (
          <div style={{ width: '20rem' }}>
              {filteredData.map((data, index) => (
                  <Card key={index} style={{ marginBottom: '20px' }}>
                      <Card.Body style={{ display: 'flex' }}>
                          <Form.Check
                              type='checkbox'
                              value={data.id_barang}
                              onChange={handleCheckboxChange}
                              style={{ marginRight: '10px'}}
                          />
                          <div>
                              <Card.Title>{data.nama_barang}</Card.Title>
                              <Card.Text>{data.no_resi}</Card.Text>
                              <Card.Text>{data.daerah_barang}</Card.Text>
                              <Card.Text>{data.alamat_penerima}</Card.Text>
                          </div>
                      </Card.Body>
                  </Card>
              ))}
          </div>
          ) : (
              <p className='text-center'>Tidak ada data</p>
          )}
        </Container>
      </div>
    );
  }

export default DashboardAdminDaerah;
