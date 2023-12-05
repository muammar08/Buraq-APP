import React, { useState, useEffect }  from 'react'
import { Form, Container, Table, Row, Col } from 'react-bootstrap';
import '../../css/style.css';
import axios from 'axios';

function TableDaftarKurir(){

    const [data, setData] = useState([]);
    const token = localStorage.getItem('token');
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

     useEffect (() => {
        if (!token) {
          window.location.href = '/';
        } else {
          axios.get('http://localhost:8000/api/getkurir', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => {
                setData(response.data.data);
                }
            )
            .catch((error) => {
                console.error('Gagal mengambil data pengguna', error);
                }
            );
        }
        }, [token]);

    function searchTable() {
        const input = search.toLowerCase();
        const filteredData = data.filter((item) => {
            return (
                item.nama_kurir.toLowerCase().includes(input) || 
                item.alamat_kurir.toLowerCase().includes(input)
            );
        });
        setSearchResults(filteredData);
    }

    function capitalizeFirstLetter(str) {
        return str.toLowerCase().replace(/^(.)|\s+(.)/g, function ($1) {
          return $1.toUpperCase();
        });
      }

    useEffect(() => {
        searchTable();
    }, [search]);


    return(

        <div>
            <Container className='p-4'>
                <Row>
                    <Col><h2>Daftar Kurir</h2></Col>
                    <Col className='text-end'>
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
                <Table responsive>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Kurir</th>
                            <th>No Hp</th>
                            <th>Alamat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(searchResults) && searchResults.length > 0 ? (
                            searchResults.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{capitalizeFirstLetter(item.nama_kurir)}</td>
                                    <td>{item.nohp_kurir}</td>
                                    <td>{capitalizeFirstLetter(item.alamat_kurir)}</td>
                                </tr>
                            ))
                        ) : (
                            Array.isArray(data) && data.length > 0 ? (
                                data.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{capitalizeFirstLetter(item.nama_kurir)}</td>
                                        <td>{item.nohp_kurir}</td>
                                        <td>{capitalizeFirstLetter(item.alamat_kurir)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td>Tidak ada data</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}

export default TableDaftarKurir;

