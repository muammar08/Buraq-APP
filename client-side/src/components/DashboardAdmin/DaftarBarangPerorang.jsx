import React from 'react';
import Sidebar from "../Sidebar/Sidebar";
import TableBarangPerorang from "../Tables/TabelBarangPerorang";

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return token !== null;
}

function DaftarBarangPerorang() {
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
        <TableBarangPerorang title='Daftar Barang Perorang'/>
      </div>
    </div>
  );
}

export default DaftarBarangPerorang;
