import React, { useEffect, useState } from 'react';
import { Col, Container, Form, FormCheck, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import '../../css/style.css';
import axios from 'axios';
import Swal from 'sweetalert2';

function TableBarangKurir() {
  const [selectedKurir, setSelectedKurir] = useState(null);
  const [selectedBarang, setSelectedBarang] = useState([]);
  const token = localStorage.getItem('token');
  const [data, setData] = useState([]);
  const [dataKurir, setDataKurir] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);


  const handleKurirChange = (event) => {
    const kurirId = event.target.value;
    setSelectedKurir(kurirId);
  };

  const handleCheckboxChange = (event) => {
    const barangId = event.target.value;
    if (event.target.checked) {
      setSelectedBarang([...selectedBarang, barangId]);
    } else {
      setSelectedBarang(selectedBarang.filter((id) => id !== barangId));
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/setkurir',
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
      axios
        .all([
          axios.get('http://localhost:8000/api/listforkurir', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get('http://localhost:8000/api/getkurir', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ])
        .then(axios.spread((barangResponse, kurirResponse) => {
          setData(barangResponse.data.data);
          setDataKurir(kurirResponse.data.data);
        }))
        .catch((error) => {
          console.error('Gagal mengambil data atau kurir', error);
        });
    }
  }, [token]);

  function capitalizeFirstLetter(str) {
    return str.toLowerCase().replace(/^(.)|\s+(.)/g, function ($1) {
      return $1.toUpperCase();
    });
  }

  function searchTable(){
    const input = search.toLowerCase();
    const filteredData = data.filter((item) => {
      return (
        item.nama_barang.toLowerCase().includes(input) ||
        item.nama_penerima.toLowerCase().includes(input) ||
        item.suplier.nama_suplier.toLowerCase().includes(input)
      );
    }
    );
    setSearchResults(filteredData);
  }

  useEffect(() => {
    searchTable();
  }, [search]);

  return (
    <div>
      <div className="m-4">
        <h4>Pilih Kurir</h4>
        <Row>
          <Col>
          <Form.Select value={selectedKurir || ''} aria-label="Default select example" onChange={handleKurirChange}>
            <option>Pilih Kurir</option>
            {Array.isArray(dataKurir) ? (
                dataKurir.map((item, index) => (
                <option key={index} value={item.id_kurir}>
                    {item.nama_kurir}
                </option>
                ))
            ) : (
                <option>Tidak ada data</option>
            )}
            </Form.Select>
          </Col>
          <Col>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
          </Col>
        </Row>
      </div>
      <Container className="p-4">
        <Row>
          <Col xs={10}>
            <h2>Daftar Barang Suplier</h2>
          </Col>
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
        <div style={{ overflowX: 'auto', overflowY: 'scroll', maxHeight: '400px' }}>
          <Table className="table align-middle" style={{ position: 'relative' }}>
            <thead>
              <tr className="black table align-middle">
                <th>No</th>
                <th>Nama Barang</th>
                <th>Jumlah Barang</th>
                <th>Nama Penerima</th>
                <th>Kabupaten</th>
                <th>No Hp Penerima</th>
                <th>Nama Perusahaan</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(searchResults) && searchResults.length > 0 ? (
                [...searchResults].reverse().map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{capitalizeFirstLetter(item.nama_barang)}</td>
                    <td>{capitalizeFirstLetter(item.jumlah_barang)}</td>
                    <td>{capitalizeFirstLetter(item.nama_penerima)}</td>
                    <td>{capitalizeFirstLetter(item.daerah_barang)}</td>
                    <td>{item.nohp_penerima}</td>
                    <td>{capitalizeFirstLetter(item.suplier.nama_suplier)}</td>
                    <td>
                      <FormCheck
                        type="checkbox"
                        value={item.id_barang} // Gunakan id barang sebagai nilai checkbox
                        onChange={handleCheckboxChange}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                Array.isArray(data) && data.length > 0 ? (
                  [...data].reverse().map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{capitalizeFirstLetter(item.nama_barang)}</td>
                      <td>{capitalizeFirstLetter(item.jumlah_barang)}</td>
                      <td>{capitalizeFirstLetter(item.nama_penerima)}</td>
                      <td>{capitalizeFirstLetter(item.daerah_barang)}</td>
                      <td>{item.nohp_penerima}</td>
                      <td>{capitalizeFirstLetter(item.suplier.nama_suplier)}</td>
                      <td>
                        <FormCheck
                          type="checkbox"
                          value={item.id_barang} // Gunakan id barang sebagai nilai checkbox
                          onChange={handleCheckboxChange}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8}>Tidak ada data</td>
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

export default TableBarangKurir;
