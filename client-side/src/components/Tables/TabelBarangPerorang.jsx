import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import '../../css/style.css';
import axios from 'axios';
import BASE_URL from '../../config';

function TableBarangPerorang({title}) {

  const [data, setData] = useState([]);
  const token = localStorage.getItem('token');
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect (() => {
    if (!token) {
      window.location.href = '/';
    } else {
      axios.get(`${BASE_URL}/api/listbarangsatuan`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data.data);
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

  function formatDate(date) {
    // Memisahkan tanggal, bulan, dan tahun dengan menggunakan split()
    const dateNew = new Date(date);
    // Mengambil nilai tanggal, bulan, dan tahun
    const day = dateNew.getDate();
    const month = dateNew.getMonth() + 1;
    const year = dateNew.getFullYear();
    // Menggabungkan kembali dengan format yang diinginkan
    return `${day}-${month}-${year}`;
  }

  function handleDateChange(date) {
    setSelectedDate(date);
    searchTable(date);
  }

  function searchTable() {
    const input = search.toLowerCase();
    let filteredData = data;
    const date = new Date(selectedDate);
  
    if (date.toString() !== 'Invalid Date') {
      filteredData = filteredData.filter((item) => {
        // Ubah format tanggal pada data untuk membandingkan dengan tanggal yang dipilih
        const itemDate = new Date(item.created_at);
        const formattedItemDate = `${itemDate.getFullYear()}-${('0' + (itemDate.getMonth() + 1)).slice(-2)}-${('0' + itemDate.getDate()).slice(-2)}`;
        return formattedItemDate === selectedDate;
      });
  
      setSearchResults(filteredData);
    } else {
      filteredData = filteredData.filter((item) => {
        return (
          item.nama_barang.toLowerCase().includes(input) ||
          item.nama_penerima.toLowerCase().includes(input)
        );
      });
  
      setSearchResults(filteredData);
    }
  }
  
  useEffect(() => {
    searchTable();
  }, [search, selectedDate]);

  return (
    <div>
      <Container className='mt-4'>
      <Row className='mb-3'>
          <Col xs={8}><h2 className='text-black'>{title}</h2></Col>
        </Row>
        <Row className='mb-4'>
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
          <Col>
          <input 
              className='form-control' 
              type='date' 
              placeholder='Pilih Tanggal'
              value={selectedDate}
              onChange={(e) => handleDateChange(e.target.value)}
              />
          </Col>
        </Row>

        <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '550px' }}> 
          <Table className='table align-middle' style={{position : 'relative'}}>
            <thead>
              <tr className='black table align-middle'>
                <th>No</th>
                <th>Tanggal</th>
                <th>Nama Penerima</th>
                <th>Nama Barang</th>
                <th>Jumlah Barang</th>
                <th>Alamat Penerima</th>
                <th>Kabupaten</th>
                <th>No Hp Penerima</th>
                <th>Resi</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(searchResults) && searchResults.length > 0 ? (
                [...searchResults].reverse().map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{formatDate(item.created_at)}</td>
                    <td>{capitalizeFirstLetter(item.nama_penerima)}</td>
                    <td>{capitalizeFirstLetter(item.nama_barang)}</td>
                    <td>{capitalizeFirstLetter(item.jumlah_barang)}</td>
                    <td>{capitalizeFirstLetter(item.alamat_penerima)}</td>
                    <td>{item.daerah_satuan}</td>
                    <td>{item.nohp_penerima}</td>
                    <td>{(item.no_resi_satuan)}</td>
                  </tr>
                ))
              ) : (
                Array.isArray(data) && data.length > 0 ? (
                  [...data].reverse().map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{formatDate(item.created_at)}</td>
                      <td>{capitalizeFirstLetter(item.nama_penerima)}</td>
                      <td>{capitalizeFirstLetter(item.nama_barang)}</td>
                      <td>{capitalizeFirstLetter(item.jumlah_barang)}</td>
                      <td>{capitalizeFirstLetter(item.alamat_penerima)}</td>
                      <td>{item.daerah_satuan}</td>
                      <td>{item.nohp_penerima}</td>
                      <td>{(item.no_resi_satuan)}</td>
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

export default TableBarangPerorang;
