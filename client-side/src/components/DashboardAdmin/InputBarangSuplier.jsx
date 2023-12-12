import { MDBInput } from "mdb-react-ui-kit";
import Sidebar from "../Sidebar/Sidebar";
import React, { useState, useEffect} from 'react'
import {Button, Col, Form, Row} from 'react-bootstrap'
import axios from 'axios';
import Swal from 'sweetalert2';
import Select from "react-select";
import BASE_URL from '../../config';

function InputBarangSuplier() {
    
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem('token');

  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState('');


  useEffect(() => {
    if (!token) {
      window.location.href = '/';
    } else {
      axios.get(`${BASE_URL}/api/getsuplier`, {
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

    const [noResi, setNoResi] = useState(); // State untuk menyimpan data inputan noResi
    const [namaBarang, setNamaBarang] = useState('');
    const [jumlahBarang, setJumlahBarang] = useState('');
    const [namaPenerima, setNamaPenerima] = useState('');
    const [nohpPenerima, setNohpPenerima] = useState('');
    const [alamatPenerima, setAlamatPenerima] = useState('');
    const [selectedDaerah, setSelectedDaerah] = useState(null);

  const handleSupplierChange = (event) => {
    setSelectedSupplier(event.target.value);
  };

  const handleInputBarang = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(
            `${BASE_URL}/api/createbarang`,
            {
                noResi: noResi,
                namaBarang: namaBarang,
                jumlahBarang: jumlahBarang,
                namaPenerima: namaPenerima,
                nohpPenerima: nohpPenerima,
                alamatPenerima: alamatPenerima,
                namaPerusahaan: selectedSupplier,
                daerahBarang: selectedDaerah?.value,
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
        setNoResi();
        setNamaBarang('');
        setJumlahBarang('');
        setNamaPenerima('');
        setNohpPenerima('');
        setAlamatPenerima('');
        setSelectedSupplier('');
        setSelectedDaerah('');

      
        setTimeout(() => {
          window.location.reload();
      }, 1500);

    } catch (error) {
        console.error('Error creating barang', error);

        Swal.fire({
            icon: 'error',
            title: 'Gagal menyimpan data',
            text: 'Terjadi kesalahan saat menyimpan data.',
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
                <h2 className="mb-4">Input Barang Suplier</h2>
                <MDBInput className="mb-4" label='No Resi' id='noResi' type='text' onChange={(e) => setNoResi(e.target.value)}/>
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

                <Form.Select
                    value={selectedSupplier}
                    onChange={handleSupplierChange}
                    className="mb-4"
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



export default InputBarangSuplier;