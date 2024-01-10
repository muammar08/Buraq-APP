import React from 'react';
import Sidebar from "../Sidebar/Sidebar";
import TableBarangSemua from "../Tables/TableBarangSemua";

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return token !== null;
}

function DaftarBarangSemua() {
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
        <TableBarangSemua title='Daftar Barang Semua'/>
      </div>
    </div>
  );
}

export default DaftarBarangSemua;
