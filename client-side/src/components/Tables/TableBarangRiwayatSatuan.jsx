import React, { useEffect, useState } from 'react';
import { Col, Container, Modal, Row, Card} from 'react-bootstrap';
import Select from "react-select";
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
  const [selectedDaerah, setSelectedDaerah] = useState('');
  

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
  
  const handleDaerahChange = (selectedOption) => {
      setSelectedDaerah(selectedOption.value);
      searchTable(); 
  };

  const customStyles = {
    control: (provided) => ({
        ...provided,
        minWidth: 200,
        margin: '0px 0',
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999, // Adjust the z-index to make sure it appears above other elements
    }),
  };

  function searchTable() {
    const input = search.toLowerCase();
    const filteredData = data.filter((item) => {
      return (
        (item.nama_barang.toLowerCase().includes(input) ||
          item.nama_penerima.toLowerCase().includes(input)) &&
        (!selectedDaerah || item.daerah_satuan === selectedDaerah)
      );
    });
    setSearchResults(filteredData);
  }

  useEffect(() => {
    searchTable();
  }, [search, selectedDaerah]);

  return (
    <div>
      <Container className='p-5'>
        <Row>
          <Col xs={5}><h2>{title}</h2></Col>
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
          <Col >
            <Select
              options={daerahOptions}
              className='mb-4'
              value={selectedDaerah}
              onChange={handleDaerahChange}
              placeholder="Pilih Daerah"
              styles={customStyles}
              isClearable
              isSearchable
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
                    <td>{item.daerah_satuan}</td>
                    <td>{item.nohp_penerima}</td>
                    <td>
                      <a href="#" onClick={() => handleShowModal(item.id_satuan)}>{capitalizeFirstLetter(item.foto)}</a>
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
                        <td>{item.daerah_satuan}</td>
                        <td>{item.nohp_penerima}</td>
                        <td className='text-dark'>
                          <a className='text-dark' href="#" onClick={() => handleShowModal(item.id_satuan)}>{capitalizeFirstLetter(item.foto)}</a>
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
