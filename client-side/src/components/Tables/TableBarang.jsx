import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import '../../css/style.css';
import axios from 'axios';

function TableBarang({title}) {

  const [data, setData] = useState([]);
  const token = localStorage.getItem('token');
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect (() => {
    if (!token) {
      window.location.href = '/';
    } else {
      axios.get('http://127.0.0.1:8000/api/listbarang', {
        headers: {
          Authorization: `Bearer ${token}`,
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
        item.nama_penerima.toLowerCase().includes(input) ||
        item.suplier.nama_suplier.toLowerCase().includes(input)
      );
    });
    setSearchResults(filteredData);
  }
  
  useEffect(() => {
    searchTable();
  }, [search]);

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
        <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '550px' }}> 
          <Table className='table align-middle' style={{position : 'relative'}}>
            <thead>
              <tr className='black table align-middle'>
                <th>No</th>
                <th>Nama Barang</th>
                <th>Jumlah Barang</th>
                <th>Nama Penerima</th>
                <th>Alamat Penerima</th>
                <th>No Hp Penerima</th>
                <th>Nama Perusahaan</th>
                <th>Status Pengiriman</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(searchResults) && searchResults.length > 0 ? (
                searchResults.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{capitalizeFirstLetter(item.nama_barang)}</td>
                    <td>{capitalizeFirstLetter(item.jumlah_barang)}</td>
                    <td>{capitalizeFirstLetter(item.nama_penerima)}</td>
                    <td>{capitalizeFirstLetter(item.alamat_penerima)}</td>
                    <td>{capitalizeFirstLetter(item.nohp_penerima)}</td>
                    <td>{capitalizeFirstLetter(item.suplier.nama_suplier)}</td>
                    <td>{capitalizeFirstLetter(item.status)}</td>
                  </tr>
                ))
              ) : (
                Array.isArray(data) && data.length > 0 ? (
                  data.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{capitalizeFirstLetter(item.nama_barang)}</td>
                      <td>{capitalizeFirstLetter(item.jumlah_barang)}</td>
                      <td>{capitalizeFirstLetter(item.nama_penerima)}</td>
                      <td>{capitalizeFirstLetter(item.alamat_penerima)}</td>
                      <td>{capitalizeFirstLetter(item.nohp_penerima)}</td>
                      <td>{capitalizeFirstLetter(item.suplier.nama_suplier)}</td>
                      <td>{capitalizeFirstLetter(item.status)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3}>Tidak ada data</td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
}

export default TableBarang;
