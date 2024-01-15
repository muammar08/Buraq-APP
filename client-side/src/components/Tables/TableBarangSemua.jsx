import React, { useEffect, useState } from "react";
import { Col, Container, Row, Tab, Button, FormSelect } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import "../../css/style.css";
import axios from "axios";
import BASE_URL from "../../config";
import jsPDF from "jspdf";
import 'jspdf-autotable';

function TableBarangSemua({title}) {

    const [data, setData] = useState([]);
    const token = localStorage.getItem('token');
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedDaerah, setSelectedDaerah] = useState(null);

    useEffect (() => {
        if (!token) {
          window.location.href = '/';
        } else {
          axios.get(`${BASE_URL}/api/listdata`, {
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
        const results = data.filter((data) =>
            data.nama_barang.toLowerCase().includes(search.toLowerCase())
        );
        setSearchResults(results);
    }

    const customStyles = {
        control: (provided) => ({
            ...provided,
            minWidth: 200,
            margin: '0px 0',
        }),
    };

    useEffect(() => {
        searchTable();
    }, [search]);

    const generatePDF = () => {
        const pdfDoc = new jsPDF();
        const date = new Date();
    
        const textMarginTop = 20;
        const textMarginLeft = 120;

        pdfDoc.setFont('times', 'bold');
        pdfDoc.setFontSize(12);
        pdfDoc.setTextColor(105, 108, 136);
        pdfDoc.text('Kantor Pelayanan Pusat : ', 10, textMarginTop + 2);

        pdfDoc.setFontSize(8);
        pdfDoc.text('BANDA ACEH : Jl. T.Imum Leung Bata No. 8 Telp (0651) 22763 HP. 081360600636', 10, textMarginTop + 7);
        pdfDoc.text('BIREUN : Jl. Gajah No.01 Komp. Terminal HP. 081357094676', 10, textMarginTop + 10.5);
        pdfDoc.text('KR. GEUKEUH : JNE Krueng Geukeuh, HP. 082367253053', 10, textMarginTop + 13.5);
        pdfDoc.text('LHOKSEUMAWE : Telp (0645) 47307 HP. 085260357575 Cunda Lewat Pos Lantas', 10, textMarginTop + 16.5);
        pdfDoc.text('LANGSA : Depan POLRES Langsa HP. 08527591884', 10, textMarginTop + 19.5);
        pdfDoc.text('MEULABOH : Jl. Singgpa Mata HP. 085277155767', 10, textMarginTop + 22.5);
        pdfDoc.text('TAKENGON : Jl. Sengeda HP. 085260002040', 10, textMarginTop + 25.5);
        pdfDoc.text('MEDAN : Jl. Kapten Sumarsono No. 77 A Medan HP. 085100130034', 10, textMarginTop + 28.5);
    
        // Set Supir, Hari Tanggal, BL / BK, and Tujuan text
        pdfDoc.setFont('times', 'bold');
        pdfDoc.setFontSize(12);
        pdfDoc.setTextColor(0);
        pdfDoc.text('Supir        : ___________________________', textMarginLeft, textMarginTop);
        pdfDoc.text('Hari Tanggal : ' + formatDate(date), textMarginLeft, textMarginTop + 10);
        pdfDoc.text('BL / BK      : ___________________________', textMarginLeft, textMarginTop + 20);
        pdfDoc.text('Tujuan       : ___________________________', textMarginLeft, textMarginTop + 30);
    
        // Calculate the center position for the text "REPAS BARANG"
        const text = 'REPAS BARANG';
        const textWidth = pdfDoc.getTextWidth(text);
        const centerX = (pdfDoc.internal.pageSize.width - textWidth) / 2;

        pdfDoc.setFontSize(18);
        pdfDoc.setTextColor(50, 109, 190);
        // Set REPAS BARANG text
        pdfDoc.text(text, centerX - 10, textMarginTop + 40);
        const underlineY = textMarginTop + 50 + 14; // Adjust this value based on the font size
        const underlineHeight = 0.2;
        pdfDoc.setLineWidth(underlineHeight);
        pdfDoc.line(centerX, underlineY, centerX + textWidth, underlineY);

        pdfDoc.setFont('times', 'normal');
        pdfDoc.setFontSize(12);
    
        // Set autoTable options
        pdfDoc.autoTable({
            columnStyles: { halign: 'center', fillColor: [255, 255, 255] },
            margin: { top: 70 },
            head: [['No.', 'Pengirim', 'Penerima', 'Jumlah Coly', 'Jumlah Harga', 'Ket.']],
            body: data.map((item, index) => [
                index + 1,
                item.suplier || item.nama_pengirim,
                item.nama_penerima,
                item.jumlah_barang,
                item.harga || '',
                // Add the 'Ket.' value here if it exists in your 'item' object
                '',
            ]),
            headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
            styles: {
                lineColor: [169, 169, 169],
                lineWidth: 0.2,
            },
        });
    
        pdfDoc.save('output.pdf');
    };    

    return (
        <div>
            <Container className='mt-4'>
                <Row className='mb-3'>
                    <Col xs={8}><h2 className='text-black'>{title}</h2></Col>
                    <Col xs={4} className='d-flex justify-content-end'><Button className='m-1' onClick={generatePDF}>Print Pdf</Button></Col>
                </Row>
                <Row>
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
                        <FormSelect>
                            <option value="">Pilih Daerah</option>
                            {daerahOptions.map((option, index) => (
                                <option key={index} value={option.value}>{option.label}</option>
                            ))}
                        </FormSelect>
                    </Col>
                    <Col >
                    <input 
                        className='form-control' 
                        type='date' 
                        placeholder='Pilih Tanggal'
                        value={selectedDate}
                        onChange={(e) => handleDateChange(e.target.value)}
                    />
                    </Col>
                </Row>
                <div className="mt-3">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama Perusahaan</th>
                                <th>Tanggal</th>
                                <th>Nama Penerima</th>
                                <th>Nama Barang</th>
                                <th>Jumlah Barang</th>
                                <th>Kabupaten</th>
                                <th>Resi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(searchResults) && searchResults.length > 0 ? (
                                [...searchResults].reverse().map((data, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            {data.suplier ? capitalizeFirstLetter(data.suplier.nama_suplier) : 'Barang Per Orang'}
                                        </td>
                                        <td>{formatDate(data.created_at)}</td>
                                        <td>{capitalizeFirstLetter(data.nama_penerima)}</td>
                                        <td>{capitalizeFirstLetter(data.nama_barang)}</td>
                                        <td>{capitalizeFirstLetter(data.jumlah_barang)}</td>
                                        <td>{data.daerah_barang || data.daerah_satuan}</td>
                                        <td>{data.no_resi || data.no_resi_satuan}</td>
                                    </tr>
                                ))   
                            ) : (
                                Array.isArray(data) && data.length > 0 ? (
                                    [...data].reverse().map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                {item.suplier ? capitalizeFirstLetter(item.suplier.nama_suplier) : 'Barang Per Orang'}
                                            </td>
                                            <td>{formatDate(item.created_at)}</td>
                                            <td>{capitalizeFirstLetter(item.nama_penerima)}</td>
                                            <td>{capitalizeFirstLetter(item.nama_barang)}</td>
                                            <td>{capitalizeFirstLetter(item.jumlah_barang)}</td>
                                            <td>{item.daerah_barang || item.daerah_satuan}</td>
                                            <td>{item.no_resi || item.no_resi_satuan}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={8} className='text-center'>Tidak ada data</td>
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

export default TableBarangSemua;