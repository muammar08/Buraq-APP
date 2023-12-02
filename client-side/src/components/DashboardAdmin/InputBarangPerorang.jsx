import {MDBInput } from "mdb-react-ui-kit";
import Sidebar from "../Sidebar/Sidebar";
import React, { useState, useEffect} from 'react'
import {Button, Col, Form, Row} from 'react-bootstrap'
import axios from 'axios';
import Swal from 'sweetalert2';
import Select from "react-select";

function InputBarangPerorang() {
    
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem('token');

  const [suppliers, setSuppliers] = useState([]);

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
    const [noResiSatuan, setNoResiSatuan] = useState();
    const [pembayaran, setPembayaran] = useState('');
    const [selectedDaerah, setSelectedDaerah] = useState(null);
    const [harga, setHarga] = useState('');


  const handleInputBarang = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(
            'http://127.0.0.1:8000/api/createbarangsatuan',
            {
                noResiSatuan: noResiSatuan,
                namaBarang: namaBarang,
                jumlahBarang: jumlahBarang,
                namaPenerima: namaPenerima,
                alamatPenerima: alamatPenerima,
                nohpPenerima: nohpPenerima,
                pembayaran: pembayaran,
                daerahSatuan: selectedDaerah?.value,
                harga: harga,
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
        setNoResiSatuan();
        setNamaBarang('');
        setJumlahBarang('');
        setNamaPenerima('');
        setNohpPenerima('');
        setAlamatPenerima('');
        setSelectedDaerah('');
        setPembayaran('');
        setHarga('');

      
        setTimeout(() => {
            window.location.reload();
        }, 1500);

        } catch (error) {
            console.error('Error creating barang', error);

            Swal.fire({
                icon: 'error',
                title: 'Gagal menyimpan data',
                text: 'Terjadi kesalahan saat menyimpan data. Resi Sudah Terdaftar',
              });
        }
    };

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
        setSelectedDaerah(selectedOption);
    };

    const customStyles = {
        control: (provided) => ({
            ...provided,
            minWidth: 200,
            margin: '8px 0',
        }),
    };

    const handlePaymentChange = (e) => {
        setPembayaran(e.target.value);
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
                <h2 className="mb-4">Input Barang Perorang</h2>
                <MDBInput className="mb-4" label='No Resi' id='noResiSatuan' type='text' onChange={(e) => setNoResiSatuan(e.target.value)}/>
                <div className="row mb-4">
                    <div className="col">
                        <MDBInput label='Nama  Barang' id='namaBarang' type='text' onChange={(e) => setNamaBarang(e.target.value)}/>
                    </div>
                    <div className="col">
                        <MDBInput label='Jumlah Barang' id='jumlahBarang' type='text' onChange={(e) => setJumlahBarang(e.target.value)} />
                    </div>
                </div>
                <Row className="mb-4">
                    <Col>
                        <MDBInput label='Nama  Penerima' id='namaPenerima' type='text' onChange={(e) => setNamaPenerima(e.target.value)}/>
                    </Col>
                    <Col>
                        <MDBInput label='No Hp Penerima' id='nohpPenerima' type='text' onChange={(e) => setNohpPenerima(e.target.value)}/>
                    </Col>
                </Row>
                
                <MDBInput className="mb-4" label='Alamat Penerima' id='alamatPenerima' type='text' onChange={(e) => setAlamatPenerima(e.target.value)}/>
                <Select
                    options={daerahOptions}
                    className='mb-4'
                    id='daerahSatuan'
                    value={selectedDaerah}
                    onChange={handleDaerahChange}
                    placeholder="Pilih Daerah"
                    styles={customStyles}
                    isClearable
                    isSearchable
                />
                <Row className="mb-4">
                    <Col>
                        <Form.Select
                            onChange={handlePaymentChange}
                            value={pembayaran}
                            id='pembayaran'
                        >
                            <option>Pilih Pembayaran</option>
                            <option value="Lunas">Lunas</option>
                            <option value="COD">COD</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        {pembayaran === 'COD' && (
                            <MDBInput
                                type="text"
                                label="Harga COD"
                                id='harga'
                                value={harga}
                                onChange={(e) => setHarga(e.target.value)}
                            />
                        )}
                    </Col>
                </Row>
                

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



export default InputBarangPerorang;