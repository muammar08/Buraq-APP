import React from 'react'
import Sidebar from '../Sidebar/Sidebar';
import TableBarangRiwayat from '../Tables/TableBarangRiwayat';

function Riwayat() {

    const tableTitle = "Riwayat"
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
                <TableBarangRiwayat title={tableTitle}/>
            </div>
        </div>
    )
}

export default Riwayat;