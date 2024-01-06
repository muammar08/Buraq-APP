import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Row, Col } from 'react-bootstrap';
import gambar from '../../assets/noimage.png';
import axios from 'axios';
import BASE_URL from '../../config';

function CardKurir({searchTerm = ''}) {
  const [showModal, setShowModal] = useState(false);
  const [showModalSatuan, setShowModalSatuan] = useState(false);
  const [selectedImage, setSelectedImage] = useState([]);
  const [tempSelectedImage, setTempSelectedImage] = useState(null); // Untuk menyimpan gambar yang dipilih.
  const token = localStorage.getItem('token');
  const [selectedData, setSelectedData] = useState([]);
  const [selectedDataSatuan, setSelectedDataSatuan] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null); // Store the selected item ID
  const [selectedItemIdSatuan, setSelectedItemIdSatuan] = useState(null); // Store the selected item ID
  const [formData, setFormData] = useState(null); // Store the uploaded file

  useEffect(() => {
    if (token) {
      axios.get(`${BASE_URL}/api/listbarangkurir`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420",
        },
      })
        .then((response) => {
          setSelectedData(response.data.data);
          setSelectedDataSatuan(response.data.dataSatuan);
          console.log(response.data.data);
        })
        .catch((error) => {
          console.error('Gagal mengambil data barang', error);
        });
    }
  }, [token]);

  
  
  const handleShowModal = (id) => {
    setSelectedItemId(id); // Set the selected item ID
    setShowModal(true);
  };

  const handleShowModalSatuan = (id) => {
    setSelectedItemIdSatuan(id); // Set the selected item ID
    setShowModalSatuan(true);
  };

  const handleCloseModal = () => {
    setSelectedItemId(null); // Clear the selected item ID
    setShowModal(false);
  };

  const handleCloseModalSatuan = () => {
    setSelectedItemIdSatuan(null); // Clear the selected item ID
    setShowModalSatuan(false);
  };

  const handleFileUpload = (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;
  
      // Create a FormData object and append the file to it
      const formData = new FormData();
      formData.append('foto', file);
  
      // Set the selected image in state and store the FormData
      setSelectedImage(file);
      setFormData(formData);
  
      const fileUrl = URL.createObjectURL(file);
      setTempSelectedImage(fileUrl);
      console.log(file);
    } catch (error) {
      console.error('Gagal mengupload file', error);
    }
  };
  
  const handleSubmit = async () => {
    try {
      // Ensure you have formData defined in your state
      if (!formData) {
        console.error('No file selected for upload');
        return;
      }
  
      const response = await axios.post(
        `${BASE_URL}/api/upfoto/${selectedItemId}`,
        formData, // Use the FormData object
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

  const handleSubmitSatuan = async () => {
    try {
      // Ensure you have formData defined in your state
      if (!formData) {
        console.error('No file selected for upload');
        return;
      }
  
      const response = await axios.post(
        `${BASE_URL}/api/upfotosatuan/${selectedItemIdSatuan}`,
        formData, // Use the FormData object
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
  
  

  const selectedItem = selectedData.find((item) => item.id_barang === selectedItemId);
  const selectedItemSatuan = selectedDataSatuan.find((item) => item.id_satuan === selectedItemIdSatuan);

  const filteredData = selectedData.filter((item) =>
        item.nama_barang.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDataSatuan = selectedDataSatuan.filter((item) =>
        item.nama_barang.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='m-2'>
      {filteredData.length > 0 ? (
        filteredData.map((data, index) => (
          <Card className='mb-4' key={index} style={{ width: '20rem' }} onClick={() => handleShowModal(data.id_barang)}>
            <div className="">
            <Row>
                <Col >
                    <Card.Body>
                        <Card.Text className='fw-bold fs-5 mb-1'>{data.nama_barang}</Card.Text>
                        <Card.Text className='mb-1'>{data.nama_penerima}</Card.Text>
                        <Card.Text className='mb-1'>{data.nohp_penerima}</Card.Text>
                        <Card.Text className='mb-1'>{data.alamat_penerima}</Card.Text>
                    </Card.Body>
                </Col>
            </Row>
            </div>
          </Card>
        ))
      ) : (
        <h4></h4>
      )}
      {filteredDataSatuan.length > 0 ? (
        filteredDataSatuan.map((data, index) => (
          <Card className='mb-4' key={index} style={{ width: '20rem' }} onClick={() => handleShowModalSatuan(data.id_satuan)}>
            <div className="">
            <Row>
                <Col >
                    <Card.Body>
                      
                        <Card.Text className='fw-bold fs-5 mb-1'>{data.nama_barang} &ensp;
                          {data.pembayaran === 'Lunas' ? (
                            <Button className='p-1 fw-bold fs-7 bg-success shadow-lg rounded-pill'>Lunas</Button>
                          ) : data.pembayaran === 'COD' ? (
                              <Button className='p-1 fw-bold fs-7 bg-warning shadow-lg rounded-pill'>COD</Button>
                          ) : null // Handle other status as needed  
                          }
                          <Card.Text>{data.harga}</Card.Text>
                        </Card.Text>
                        <Card.Text className='mb-1'>{data.nama_penerima}</Card.Text>
                        <Card.Text className='mb-1'>{data.nohp_penerima}</Card.Text>
                        <Card.Text className='mb-1'>{data.alamat_penerima}</Card.Text>
                    </Card.Body>
                </Col>
            </Row>
            </div>
          </Card>
        ))
      ) : (
        <h4></h4>
      )}
    
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
                    <Button className='mt-1' variant="success" onClick={handleSubmit}>
                      Submit
                    </Button>
                  </Col>
                </Row>
                <Row>
                </Row>
              </div>
            </>
          )}
        </Modal.Body>
    </Modal>

    <Modal show={showModalSatuan} onHide={handleCloseModalSatuan} centered>
        <Modal.Header closeButton>
            <Modal.Title>Detail Informasi Barang</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItemSatuan && (
            <>
              <Row>
                <Col md={8}>
                  <Card.Body>
                    <Card.Text className='fw-bold fs-5'>{selectedItemSatuan.nama_barang}</Card.Text>
                    <Card.Text>{selectedItemSatuan.nama_penerima}</Card.Text>
                    <Card.Text>{selectedItemSatuan.nohp_penerima}</Card.Text>
                    <Card.Text>{selectedItemSatuan.alamat_penerima}</Card.Text>
                    <Card.Text>Rp. {selectedItemSatuan.harga}</Card.Text>
                  </Card.Body>
                </Col>
                <Col md={4}>
                  <Card.Img
                    variant="top"
                    id="cardImageModal"
                    src={tempSelectedImage || gambar}
                    style={{ objectFit: 'cover' }}
                    value={selectedItemSatuan.foto}
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
                    <Button className='mt-1' variant="success" onClick={handleSubmitSatuan}>
                      Submit
                    </Button>
                  </Col>
                </Row>
                <Row>
                </Row>
              </div>
            </>
          )}
        </Modal.Body>
    </Modal>

    </div>
  );
}

export default CardKurir;
