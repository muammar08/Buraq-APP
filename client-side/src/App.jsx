import { useState } from 'react'
import './App.css'
import Login from './components/Routes/Login'
import {BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardAdmin from './components/DashboardAdmin/DashboardAdmin'
import Kurir from './components/DashboardAdmin/Kurir'
import DashboardKurir from './components/DashboardKurir/DashboardKurir'
import DashboardSupplier from './components/DashboardSupplier/DashboardSupplier'
import InputBarang from './components/DashboardAdmin/InputBarang'
import Register from './components/DashboardAdmin/Register'
import Riwayat from './components/DashboardAdmin/Riwayat'
import DaftarKurir from './components/DashboardAdmin/DaftarKurir'
import DaftarSuplier from './components/DashboardAdmin/DaftarSuplier'
import LandingPage from './components/LandingPage/LandingPage'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path='/dashboardAdmin' element={<DashboardAdmin/>}/>
        <Route path='/daftarBarangKurir' element={<Kurir/>}/>
        <Route path='/dashboardKurir' element={<DashboardKurir/>} />
        <Route path='/dashboardSuplier' element={<DashboardSupplier/>} />
        <Route path='/inputBarang' element={<InputBarang/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/riwayat' element={<Riwayat/>} />
        <Route path='/daftarKurir' element={<DaftarKurir/>} />
        <Route path='/daftarSuplier' element={<DaftarSuplier/>} />
        <Route path='/landingPage' element={<LandingPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
