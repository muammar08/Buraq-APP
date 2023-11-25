import React from 'react';
import Sidebar from "../Sidebar/Sidebar";
import TableBarangSuplier from "../Tables/TableBarangSuplier";

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return token !== null;
}

function DaftarBarangSuplier() {
  if (!isAuthenticated()) {
    window.location.href = '/';
    return null; // Return null to prevent rendering the component
  }

  return (
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
        <TableBarangSuplier title='Daftar Barang Suplier'/>
      </div>
    </div>
  );
}

export default DaftarBarangSuplier;
