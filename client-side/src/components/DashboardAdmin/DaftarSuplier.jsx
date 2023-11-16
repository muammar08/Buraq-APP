import React from 'react'
import Sidebar from '../Sidebar/Sidebar';
import TableDaftarSuplier from '../Tables/TableDaftarSuplier';

function DaftarSuplier(){
    return(
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div
                className="content"
                style={{
                flex: 1,
                justifyContent: 'start',
                }}
            >
                <TableDaftarSuplier/>
            </div>
        </div>
    )
}

export default DaftarSuplier;