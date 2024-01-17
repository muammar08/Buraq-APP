import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Routes/Login';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import DashboardAdmin from './components/DashboardAdmin/DashboardAdmin';
import DashboardAdminDaerah from './components/DashboardAdminDaerah/DashboardAdminDaerah';
import DashboardKurir from './components/DashboardKurir/DashboardKurir';
import DashboardSupplier from './components/DashboardSupplier/DashboardSupplier';
import Kurir from './components/DashboardAdmin/Kurir';
import Register from './components/DashboardAdmin/Register';
import Riwayat from './components/DashboardAdmin/Riwayat';
import RiwayatSatuan from './components/DashboardAdmin/RiwayatSatuan';
import DaftarKurir from './components/DashboardAdmin/DaftarKurir';
import DaftarSuplier from './components/DashboardAdmin/DaftarSuplier';
import DaftarAdmin from './components/DashboardAdmin/DaftarAdmin';
import LandingPage from './components/LandingPage/LandingPage';
import DaftarBarangSemua from './components/DashboardAdmin/DaftarBarangSemua';
import DaftarBarangSuplier from './components/DashboardAdmin/DaftarBarangSuplier';
import DaftarBarangPerorang from './components/DashboardAdmin/DaftarBarangPerorang';
import InputBarangSuplier from './components/DashboardAdmin/InputBarangSuplier';
import InputBarangPerorang from './components/DashboardAdmin/InputBarangPerorang';
import DashboardAdminPerorang from './components/DashboardAdminDaerah/DashboardAdminPerorang';
import KurirPerorang from './components/DashboardAdmin/KurirPerorang';

function App() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('user');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />

        {role === '1' && token && (
          <>
            <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/riwayat" element={<Riwayat />} />
            <Route path="/riwayatperorang" element={<RiwayatSatuan />} />
            <Route path="/daftarKurir" element={<DaftarKurir />} />
            <Route path="/daftarSuplier" element={<DaftarSuplier />} />
            <Route path="/daftarAdmin" element={<DaftarAdmin />} />
            <Route path="/daftarBarangSemua" element={<DaftarBarangSemua />} />
            <Route path="/daftarBarangSuplier" element={<DaftarBarangSuplier />} />
            <Route path="/daftarBarangPerorang" element={<DaftarBarangPerorang />} />
            <Route path="/inputBarangSuplier" element={<InputBarangSuplier />} />
            <Route path="/inputBarangPerorang" element={<InputBarangPerorang />} />
            <Route path="/pilihKurirPerorang" element={<KurirPerorang />} />
            <Route path="/pilihKurir" element={<Kurir />} />
          </>
        )}

        {role === '2' && token && (
          <>
            <Route path="/dashboardAdminDaerah" element={<DashboardAdminDaerah />} />
            <Route path="/dashboardAdminPerorang" element={<DashboardAdminPerorang />} />
          </>
        )}

        {role === '3' && token && (
          <>
            <Route path="/dashboardSuplier" element={<DashboardSupplier />} />
          </>
        )}

        {role === '4' && token && (
          <>
            <Route path="/dashboardKurir" element={<DashboardKurir />} />
          </>
        )}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
