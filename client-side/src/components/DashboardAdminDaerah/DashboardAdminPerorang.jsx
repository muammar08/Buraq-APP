import React, { useState, useEffect } from 'react';
import BottomBar from './BottomBar';
import { Form, Row, Col, Container, Card, Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import BASE_URL from '../../config';
import gambar from '../../assets/noimage.png';

function DashboardAdminPerorang() {
    const token = localStorage.getItem('token');
    const [selectedData, setSelectedData] = useState([]);
    const [selectedBarang, setSelectedBarang] = useState([]);
    const [selectedKurir, setSelectedKurir] = useState(null); // State untuk menyimpan kurir yang dipilih

    const handleCheckboxChange = (e) => {
        const barangId = e.target.value;
        if(e.target.checked) {
            setSelectedBarang([...selectedBarang, barangId]);
        } else {
            setSelectedBarang(selectedBarang.filter((id) => id !== barangId));
        }
    }

    const handleSubmit = async () => {
        try {
          const response = await axios.post(
            `${BASE_URL}/api/setkurirsatuan`,
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
    console.log(searchTerm);

    return (
        <div>
            <div className="fixed-top d-flex justify-content-center bg-white shadow-sm">
                <div className='ms-5 mt-2'>
                    <Row>
                        <h3>Pilih Kurir</h3>
                        <Col xs={7}>
                            <Form.Select aria-label="Default select example" onChange={handleKurirSelect}>
                                <option>Pilih Kurir</option>
                                {selectedData.map((data, index) => (
                                    <option key={index} value={data.id_kurir}>{data.nama_kurir}</option>
                                ))}
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

            <CardAdminPerorang 
                kurirId={selectedKurir} 
                barangData={selectedBarang} 
                handleCheckboxChange={handleCheckboxChange} 
                searchTerm={searchTerm} 
            />

            <BottomBar setSearchTerm={setSearchTerm} />
        </div>
    )
}

function CardAdminPerorang({ handleCheckboxChange , searchTerm = ''}) {

    const token = localStorage.getItem('token');
    const [barangData, setBarangData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState([]);
    const [tempSelectedImage, setTempSelectedImage] = useState(null);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [formData, setFormData] = useState(null);
  
    useEffect(() => {
        if (token) {
            axios.get(`${BASE_URL}/api/listdaerahsatuan`, {
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

    const handleShowModal = (id) => {
        setSelectedItemId(id);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedItemId(null);
        setShowModal(false);
    };

    const handleFileUpload = (e) => {
        try {
            const file = e.target.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append('foto', file);

            setSelectedImage(file);
            setFormData(formData);

            const fileUrl = URL.createObjectURL(file);
            setTempSelectedImage(fileUrl);
            console.log(file);
        } catch (error) {
            console.error('Gagal mengupload file', error);
        }
    };

    const handleFoto = async () => {
        try {
            if (!formData) {
                console.error('No file selected for upload');
                return;
            }

            const response = await axios.post(
                `${BASE_URL}/api/adminupfotosatuan/${selectedItemId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Set the correct content type for file upload
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data);

            handleCloseModal();
            setTimeout(() => {
                window.location.reload();
            }, 1001);
        } catch (error) {
            console.error('Gagal mengirim data', error);
        }
    };

    const selectedItem = barangData.find((item) => item.id_satuan === selectedItemId);
  
    const filteredData = barangData.filter((item) =>
        item.nama_barang.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <div>
        <p className='d-flex justify-content-center align-items-center fw-bold'  style={{marginTop:'6.8rem'}}>Barang Perorang</p> 
        <Container className='d-flex justify-content-center align-items-center' >
         {filteredData.length > 0 ? (
          <div style={{ width: '20rem' }}>
              {filteredData.map((data, index) => (
                  <Card key={index} style={{ marginBottom: '20px' }} onClick={() => handleShowModal(data.id_satuan)}>
                      <Card.Body style={{ display: 'flex' }}>
                          <Form.Check
                              type='checkbox'
                              value={data.id_satuan}
                              onChange={handleCheckboxChange}
                              style={{ marginRight: '10px'}}
                          />
                          <div>
                              <Card.Title>{data.nama_barang}</Card.Title>
                              <Card.Text>{data.no_resi_satuan}</Card.Text>
                              <Card.Text>{data.daerah_satuan}</Card.Text>
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
        <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Detail Informasi Barang</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {selectedItem && (
                    <>
                        <Row>
                            <Col md={8}>
                                <Card.Body>
                                    <Card.Text className='fw-bold fs-5'>{selectedItem.nama_barang}</Card.Text>
                                    <Card.Text>{selectedItem.nama_penerima}</Card.Text>
                                    <Card.Text>{selectedItem.nohp_penerima}</Card.Text>
                                    <Card.Text>{selectedItem.alamat_penerima}</Card.Text>
                                </Card.Body>
                            </Col>
                            <Col md={4}>
                                <Card.Img
                                    variant="top"
                                    id="cardImageModal"
                                    src={tempSelectedImage || gambar}
                                    style={{ objectFit: 'cover' }}
                                    value={selectedItem.foto}
                                    name="foto"
                                />
                            </Col>
                        </Row>
                        <div className='container pt-5'>
                            <Row>
                                <Col>
                                    <label htmlFor="fileInput">
                                        <Button className='rounded-3' onClick={() => document.getElementById('fileInput').click()}>
                                            <div className='bi-camera  fs-6'></div>
                                        </Button>
                                        <input
                                            type="file"
                                            id="fileInput"
                                            accept="image/*"
                                            onChange={handleFileUpload}
                                            style={{ display: 'none' }}
                                        />
                                    </label>
                                </Col>
                                <Col className='text-end'>
                                    <Button className='mt-1' variant="success" onClick={handleFoto}>
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </>
                )}
            </Modal.Body>
        </Modal>
      </div>
    );
  }

export default DashboardAdminPerorang;
