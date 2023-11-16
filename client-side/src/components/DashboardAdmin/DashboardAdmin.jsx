import React from 'react';
import Sidebar from "../Sidebar/Sidebar";
import TableBarang from "../Tables/TableBarang";

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return token !== null;
}

function DashboardAdmin() {
  if (!isAuthenticated()) {
    window.location.href = '/';
    return null; // Return null to prevent rendering the component
  }

  const tableTitle = "Daftar Barang"

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
        <TableBarang title={tableTitle} />
      </div>
    </div>
  );
}

export default DashboardAdmin;
