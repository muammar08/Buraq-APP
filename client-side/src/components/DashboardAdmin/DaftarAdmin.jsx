import React from 'react'
import Sidebar from '../Sidebar/Sidebar';
import TableDaftarAdmin from '../Tables/TableDaftarAdmin';

function DaftarAdmin(){
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
                <TableDaftarAdmin/>
            </div>
        </div>
    )
}

export default DaftarAdmin;