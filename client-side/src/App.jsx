import { useState } from 'react'
import './App.css'
import Login from './components/Routes/Login'
import {BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardAdmin from './components/DashboardAdmin/DashboardAdmin'
import DashboardAdminDaerah from './components/DashboardAdminDaerah/DashboardAdminDaerah'
import DashboardKurir from './components/DashboardKurir/DashboardKurir'
import DashboardSupplier from './components/DashboardSupplier/DashboardSupplier'
import Kurir from './components/DashboardAdmin/Kurir'
import Register from './components/DashboardAdmin/Register'
import Riwayat from './components/DashboardAdmin/Riwayat'
import DaftarKurir from './components/DashboardAdmin/DaftarKurir'
import DaftarSuplier from './components/DashboardAdmin/DaftarSuplier'
import DaftarAdmin from './components/DashboardAdmin/DaftarAdmin'
import LandingPage from './components/LandingPage/LandingPage'
import DaftarBarangSuplier from './components/DashboardAdmin/DaftarBarangSuplier'
import DaftarBarangPerorang from './components/DashboardAdmin/DaftarBarangPerorang'
import InputBarangSuplier from './components/DashboardAdmin/InputBarangSuplier'
import InputBarangPerorang from './components/DashboardAdmin/InputBarangPerorang'
import DashboardAdminPerorang from './components/DashboardAdminDaerah/DashboardAdminPerorang'
import KurirPerorang from './components/DashboardAdmin/KurirPerorang'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/login" element={<Login />} />
        <Route path='/dashboardAdmin' element={<DashboardAdmin/>}/>
        <Route path='/dashboardAdminDaerah' element={<DashboardAdminDaerah/>}/>
        <Route path='/dashboardAdminPerorang' element={<DashboardAdminPerorang/>} />
        <Route path='/dashboardKurir' element={<DashboardKurir/>} />
        <Route path='/dashboardSuplier' element={<DashboardSupplier/>} />
        <Route path='daftarBarangSuplier' element={<DaftarBarangSuplier/>} />
        <Route path='daftarBarangPerorang' element={<DaftarBarangPerorang/>} />
        <Route path='/pilihKurir' element={<Kurir/>}/>
        <Route path='/pilihKurirPerorang' element={<KurirPerorang/>}/>
        <Route path='/inputBarangSuplier' element={<InputBarangSuplier/>} />
        <Route path='/inputBarangPerorang' element={<InputBarangPerorang/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/riwayat' element={<Riwayat/>} />
        <Route path='/daftarKurir' element={<DaftarKurir/>} />
        <Route path='/daftarSuplier' element={<DaftarSuplier/>} />
        <Route path='/daftarAdmin' element={<DaftarAdmin/>} />
        <Route path='/landingPage' element={<LandingPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
