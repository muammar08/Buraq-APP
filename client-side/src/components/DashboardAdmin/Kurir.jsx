import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import TableBarangKurir from '../Tables/TableBarangKurir';

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
          
            <TableBarangKurir/>

            </div>
      </div>
    );
}


export default Kurir;