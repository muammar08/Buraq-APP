import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, CardBody } from 'react-bootstrap';
import gambar from "../../assets/noimage.png"
import axios from 'axios';
import BASE_URL from '../../config';

function CardSupplier({ searchTerm = '' }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedData, setSelectedData] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(null); // Store the selected item ID
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            axios.get(`${BASE_URL}/api/listbarangsuplier`, {
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
                    console.error('Gagal mengambil data barang', error);
                });
        }
    }, [token]);

    // Modify handleShowModal to accept an ID
    const handleShowModal = (id) => {
        setSelectedItemId(id); // Set the selected item ID
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setSelectedItemId(null); // Clear the selected item ID
        setShowModal(false);
    }

    // Use the selectedItemId to find the item with the matching ID
    const selectedItem = selectedData.find(item => item.id_barang === selectedItemId);

    const urlGambar = selectedItem?.foto ? `${BASE_URL}/img/${selectedItem.foto}` : gambar;

    // Filter data based on the search term
    const filteredData = selectedData.filter((item) =>
        item.nama_barang.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='m-2'>
            {filteredData.length > 0 ? (
                filteredData.map((data, index) => (
                    <Card key={index} className='col-md-5 col-15 mx-auto mb-3' onClick={() => handleShowModal(data.id_barang)}>
                        <div className="d-flex align-items-center">
                            <CardBody>
                                <Card.Title>{data.nama_barang} &ensp;
                                    {data.status === 'proses' ? (
                                        <Button className='p-1 fw-bold fs-7 bg-secondary shadow-lg rounded-pill'>Proses</Button>
                                    ) : data.status === 'berhasil' ? (
                                        <Button className='p-1 fw-bold fs-7 bg-success shadow-lg rounded-pill'>Berhasil</Button>
                                    ) : null // Handle other status as needed
                                }
                                </Card.Title>
                                <Card.Text>
                                    <p>{data.alamat_penerima}</p>
                                    <p>{data.nohp_penerima}</p>
                                </Card.Text>
                            </CardBody>
                            <Card.Img
                                className='d-flex align-items-center p-3'
                                variant='center'
                                src={data.foto ? `${BASE_URL}/img/${data.foto}` : gambar}
                                style={{ width: '30%', height: '30%', objectFit: 'cover', justifyContent: 'center' }}
                            />
                        </div>
                    </Card>
                ))
            ) : (
                <p>{searchTerm ? 'Tidak ada data yang cocok.' : 'Tidak ada data.'}</p>
            )}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Detail Informasi Barang</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedItem && ( // Render the selected item if it exists
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <div className='d-flex justify-content-center'>
                                <Card.Img
                                    variant='top'
                                    src={urlGambar || gambar}
                                    style={{ width: '90%', objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleCloseModal}>
                        Tutup
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CardSupplier;
