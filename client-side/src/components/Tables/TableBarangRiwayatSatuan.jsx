import React, { useEffect, useState } from 'react';
import { Col, Container, Modal, Row, Card } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import '../../css/style.css';
import axios from 'axios';
import BASE_URL from '../../config';

function TableBarangRiwayatSatuan({title}) {

  const token = localStorage.getItem('token');
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showModal, setShowModal] = useState(false);
  

  useEffect (() => {
    if (!token) {
      window.location.href = '/';
    } else {
      axios.get(`${BASE_URL}/api/riwayatsatuan`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420",
        },
      })
      .then((response) => {
        setData(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error('Gagal mengambil data pengguna', error);
      });
      
    }
    
  }, [token]);

  function capitalizeFirstLetter(str) {
    return str.toLowerCase().replace(/^(.)|\s+(.)/g, function ($1) {
      return $1.toUpperCase();
    });
  }


    function searchTable() {
        const input = search.toLowerCase();
        const filteredData = data.filter((item) => {
            return (
                item.nama_barang.toLowerCase().includes(input) || // Sesuaikan dengan kolom yang ingin Anda cari
                item.nama_penerima.toLowerCase().includes(input) // Sesuaikan dengan kolom yang ingin Anda cari
            );
        });
        setSearchResults(filteredData);
    }

    useEffect(() => {
        searchTable();
    }, [search]);

    const handleShowModal = (id) => {
      setSelectedPhoto(id);
      setShowModal(true);
    }

    const handleCloseModal = () => {
      setSelectedPhoto(null);
      setShowModal(false);
    }

    const selectedItem = data.find(item => item.id_satuan === selectedPhoto);

    const urlGambar = selectedItem?.foto ? `${BASE_URL}/img/${selectedItem.foto}` : null;

  return (
    <div>
      <Container className='p-5'>
        <Row>
          <Col xs={8}><h2>{title}</h2></Col>
          <Col>
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
        </Row>
        <div style={{ overflowX: 'auto', overflowY: 'scroll', maxHeight: '550px' }}> 
          <Table className='table align-middle' style={{position : 'relative'}}>
            <thead>
              <tr className='black table align-middle'>
                <th>No</th>
                <th>Resi</th>
                <th>Nama Barang</th>
                <th>Jumlah Barang</th>
                <th>Nama Penerima</th>
                <th>Alamat Penerima</th>
                <th>No Hp Penerima</th>
                <th>Foto</th>
                <th>Kurir</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray (searchResults) && searchResults.length > 0 ? (
                [...searchResults].reverse().map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.no_resi_satuan}</td>
                    <td>{capitalizeFirstLetter(item.nama_barang)}</td>
                    <td>{capitalizeFirstLetter(item.jumlah_barang)}</td>
                    <td>{capitalizeFirstLetter(item.nama_penerima)}</td>
                    <td>{capitalizeFirstLetter(item.alamat_penerima)}</td>
                    <td>{item.nohp_penerima}</td>
                    <td>
                      <a href="#" onClick={() => handleShowModal(item.id_barang)}>{capitalizeFirstLetter(item.foto)}</a>
                    </td>
                    <td>{item.kurir ?capitalizeFirstLetter(item.kurir.nama_kurir) : ' '} {item.admin ? capitalizeFirstLetter(item.admin.admin_daerah) : ' '}</td>
                  </tr>
                ))
              ) : (
                Array.isArray(data) && data.length > 0 ? (
                    [...data].reverse().map((item, index) => (
                        <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.no_resi_satuan}</td>
                        <td>{capitalizeFirstLetter(item.nama_barang)}</td>
                        <td>{capitalizeFirstLetter(item.jumlah_barang)}</td>
                        <td>{capitalizeFirstLetter(item.nama_penerima)}</td>
                        <td>{capitalizeFirstLetter(item.alamat_penerima)}</td>
                        <td>{item.nohp_penerima}</td>
                        <td className='text-dark'>
                          <a className='text-dark' href="#" onClick={() => handleShowModal(item.id_barang)}>{capitalizeFirstLetter(item.foto)}</a>
                        </td>
                        <td>{item.kurir ?capitalizeFirstLetter(item.kurir.nama_kurir) : ' '} {item.admin ? capitalizeFirstLetter(item.admin.admin_daerah) : ' '}</td>
                        </tr>
                    ))
                    ) : (
                    <tr>
                        <td colSpan={3}> Tidak ada data</td>
                    </tr>
                    )
              )}      
            </tbody>
          </Table>
        </div>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Photo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedItem && (
              <Card>
                <Card.Body>
                  <Card.Title>Photo Preview</Card.Title>
                  <Card.Text>
                    <Card.Img src={urlGambar} />
                  </Card.Text>
                </Card.Body>
              </Card>
            )}
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}

export default TableBarangRiwayatSatuan;
