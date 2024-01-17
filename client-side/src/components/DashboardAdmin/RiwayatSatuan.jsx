import React from 'react'
import Sidebar from '../Sidebar/Sidebar';
import TableBarangRiwayatSatuan from '../Tables/TableBarangRiwayatSatuan';

function RiwayatSatuan() {

    const tableTitle = "Riwayat Barang Per Orang"
    return(
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div
                className="content"
                style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                }}
            >
                <TableBarangRiwayatSatuan title={tableTitle}/>
            </div>
        </div>
    )
}

export default RiwayatSatuan;