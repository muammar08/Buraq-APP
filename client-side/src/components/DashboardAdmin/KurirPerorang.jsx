import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import TableBarangKurirPerorang from '../Tables/TableBarangKurirPerorang';

function Kurir(){
    return(
        <div style={{ display: 'flex' }}>
         <Sidebar />
            <div
                className="content p-4"
                style={{
                    flex: 1, // Ini akan mengisi sisa ruang di sebelah kanan sidebar
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'start',
                }}
                >
          
            <TableBarangKurirPerorang/>

            </div>
      </div>
    );
}


export default Kurir;