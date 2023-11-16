import { MDBDropdownItem, MDBInput } from "mdb-react-ui-kit";
import Sidebar from "../Sidebar/Sidebar";
import React, { useState, useEffect} from 'react'
import {Button, Col, Form, Row} from 'react-bootstrap'
import axios from 'axios';
import Swal from 'sweetalert2';

function InputBarang() {
    
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem('token');

  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState('');


  useEffect(() => {
    if (!token) {
      window.location.href = '/';
    } else {
      axios.get('http://127.0.0.1:8000/api/getsuplier', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setSuppliers(response.data.data);
        })
        .catch((error) => {
          console.error('Error', error);
        });
    }
  }, [token]);

    const [namaBarang, setNamaBarang] = useState('');
    const [jumlahBarang, setJumlahBarang] = useState('');
    const [namaPenerima, setNamaPenerima] = useState('');
    const [nohpPenerima, setNohpPenerima] = useState('');
    const [alamatPenerima, setAlamatPenerima] = useState('');

  const handleSupplierChange = (event) => {
    setSelectedSupplier(event.target.value);
  };

  const handleInputBarang = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(
            'http://127.0.0.1:8000/api/createbarang',
            {
                namaBarang: namaBarang,
                jumlahBarang: jumlahBarang,
                namaPenerima: namaPenerima,
                nohpPenerima: nohpPenerima,
                alamatPenerima: alamatPenerima,
                namaPerusahaan: selectedSupplier,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response);

        // Tampilkan SweetAlert setelah sukses mengirim data
        Swal.fire({
            icon: 'success',
            title: 'Data berhasil disimpan',
            showConfirmButton: false,
            timer: 1500,
        });

        // Reset form fields
        setNamaBarang('');
        setJumlahBarang('');
        setNamaPenerima('');
        setNohpPenerima('');
        setAlamatPenerima('');
        setSelectedSupplier('');

      
        setTimeout(() => {
          window.location.reload();
      }, 1500);

    } catch (error) {
        console.error('Error creating barang', error);
    }
};

    return(
        <div style={{ display: 'flex' }}>
         <Sidebar />
            <div
            className="content"
            style={{
                flex: 1, // Ini akan mengisi sisa ruang di sebelah kanan sidebar
                display: '',
                justifyContent: 'start',
            }}
            >
            <Form className="p-5" onSubmit={handleInputBarang}>
                <h2 className="mb-4">Input Barang</h2>
                <div className="row mb-5">
                    <div className="col">
                        <MDBInput label='Nama  Barang' id='namaBarang' type='text' onChange={(e) => setNamaBarang(e.target.value)}/>
                    </div>
                    <div className="col">
                        <MDBInput label='Jumlah Barang' id='jumlahBarang' type='text' onChange={(e) => setJumlahBarang(e.target.value)} />
                    </div>
                </div>
                <Row className="mb-5">
                    <Col>
                        <MDBInput label='Nama  Penerima' id='namaPenerima' type='text' onChange={(e) => setNamaPenerima(e.target.value)}/>
                    </Col>
                    <Col>
                        <MDBInput label='No Hp Penerima' id='nohpPenerima' type='text' onChange={(e) => setNohpPenerima(e.target.value)}/>
                    </Col>
                </Row>
                
                <MDBInput className="mb-5" label='Alamat Penerima' id='alamatPenerima' type='text' onChange={(e) => setAlamatPenerima(e.target.value)}/>
                <Form.Select
                    value={selectedSupplier}
                    onChange={handleSupplierChange}
                    className="mb-10"
                    >
                    <option value="">Pilih Supplier</option>
                    {Array.isArray(suppliers) ? (
                        suppliers.map((supplier) => (
                        <option key={supplier.id_suplier} value={supplier.id_suplier}>
                            {supplier.nama_suplier}
                        </option>
                        ))
                    ) : (
                        <option value="loading">Loading...</option>
                    )}
                </Form.Select>

                <div className="text-end">
                <Button className="fw-bold pt-3 pb-3 ps-4 pe-4 rounded-pill" type="submit" style={{background : '#1d3557'}}>
                    Simpan Data
                </Button>
                </div>
            </Form>
            </div>
      </div>
    );
}



export default InputBarang;