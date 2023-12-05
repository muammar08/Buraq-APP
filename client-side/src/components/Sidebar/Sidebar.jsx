import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Col, Collapse, Row } from 'react-bootstrap';
import '../../css/sidebar.css';


const Sidebar = () => {

  const [isCollapsed1, setIsCollapsed1] = useState(false); // State to manage collapse
  const [isCollapsed2, setIsCollapsed2] = useState(false); // State to manage collapse
  const [isCollapsed3, setIsCollapsed3] = useState(false); // State to manage collapse
  const [isCollapsed4, setIsCollapsed4] = useState(false); // State to manage collapse
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleCollapse1 = () => {
    setIsCollapsed1(!isCollapsed1); // Function to toggle collapse state
  };
  const toggleCollapse2 = () => {
    setIsCollapsed2(!isCollapsed2); // Function to toggle collapse state
  };
  const toggleCollapse3 = () => {
    setIsCollapsed3(!isCollapsed3); // Function to toggle collapse state
  };
  const toggleCollapse4 = () => {
    setIsCollapsed4(!isCollapsed4); // Function to toggle collapse state
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  }

  return (
    <div className={`sidebar ${!isSidebarOpen ? 'open' : ''}`}>
      <div>
        <div className='p-2 mb-3 shadow-lg'>
          <Row>
            <Col className='d-flex justify-content-start'>
              {isSidebarOpen && <a href="/dashboardAdmin" className="text-decoration-none fs-4 fw-bold text-white ms-3">Buraq</a>}
            </Col>
            <Col>
             {isSidebarOpen ? <div className="d-flex justify-content-end text-white fs-4 mt-2 me-2 bi-caret-left-fill" onClick={toggleSidebar}></div> : <div className="text-white fs-1 bi-caret-right-fill" onClick={toggleSidebar}></div> } 
            </Col>
          </Row>
        </div>

        <div  style={{minHeight:'90vh', maxHeight:'150vh'}}>
        {isSidebarOpen && (
          <div>
              <ul className="list-unstyled ps-0">
                  <div>
                      <NavLink className="mb-1 text-black" onClick={toggleCollapse1}>
                      {isCollapsed1 ? <div className="bi-caret-down container text-whites rounded-end ps-4"> Daftar Barang </div> : <div className="bi-caret-right container text-whites ps-4"> Daftar Barang </div>}
                      </NavLink>
                      <Collapse in={isCollapsed1} className="ms-5" id="home-collapse">
                      <ul className="list-unstyled fw-normal pb-1 small">
                          <li className='mt-2 text-whites'><NavLink to="/daftarBarangSuplier" className="text-white">Barang Suplier</NavLink></li>
                          <li className='mt-2 text-whites'><NavLink to="/daftarBarangPerorang" className="text-white">Barang Perorang</NavLink></li>
                      </ul>
                      </Collapse>
                  </div>
                  <div>
                      <NavLink className="mb-1 text-black" onClick={toggleCollapse2}>
                      {isCollapsed2 ? <div className="bi-caret-down mt-3 container text-whites rounded-end ps-4"> Input Barang </div> : <div className="bi-caret-right mt-3 container text-whites ps-4"> Input Barang </div>}
                      </NavLink>
                      <Collapse in={isCollapsed2} className="ms-5" id="home-collapse">
                      <ul className="list-unstyled fw-normal pb-1 small">
                          <li className='mt-2 text-whites'><NavLink to="/inputBarangSuplier" className="text-white rounded">Barang Suplier</NavLink></li>
                          <li className='mt-2 text-whites'><NavLink to="/inputBarangPerorang" className="text-white rounded">Barang Perorang</NavLink></li>
                      </ul>
                      </Collapse>
                  </div>

                  <div>
                  <NavLink className="mb-1 text-black" onClick={toggleCollapse3}>
                      {isCollapsed3 ? <div className="bi-caret-down mt-3 container text-whites rounded-end ps-4"> List </div> : <div className="bi-caret-right mt-3 container text-whites ps-4"> List </div>}
                  </NavLink>
                  <Collapse in={isCollapsed3} className="ms-5" id="home-collapse">
                      <ul className="list-unstyled fw-normal pb-1 small">
                      <li className='mt-2 text-whites'><NavLink to="/daftarSuplier" className="text-white rounded">Daftar Suplier</NavLink></li>
                      <li className='mt-2 text-whites'><NavLink to="/daftarKurir" className="text-white rounded">Daftar Kurir</NavLink></li>
                      <li className='mt-2 text-whites'><NavLink to="/daftarAdmin" className="text-white rounded">Daftar Admin Daerah</NavLink></li>
                      
                      </ul>
                  </Collapse>
                  </div>
                  <div>
                  <NavLink className="mb-1 text-black" onClick={toggleCollapse4}>
                      {isCollapsed4 ? <div className="bi-caret-down mt-3 container text-whites rounded-end ps-4"> Pilih Kurir </div> : <div className="bi-caret-right mt-3 container text-whites ps-4"> Pilih Kurir </div>}
                  </NavLink>
                  <Collapse in={isCollapsed4} className="ms-5" id="home-collapse">
                      <ul className="list-unstyled fw-normal pb-1 small">
                      <li className='mt-2 text-whites'><NavLink to="/pilihKurir" className="text-white rounded">Barang Suplier</NavLink></li>
                      <li className='mt-2 text-whites'><NavLink to="/pilihKurirPerorang" className="text-white rounded">Barang Perorang</NavLink></li>
                      </ul>
                  </Collapse>
                  </div>
              
                  <NavLink to='/riwayat'><p className='mt-3 ps-4 bi-calendar2-check text-whites'>&ensp; Riwayat</p></NavLink>
                  <NavLink to='/register'><p className='mt-3 ps-4 bi-person-add text-whites'>&ensp; Register</p></NavLink>
                  <li className='border-top mt-4'></li>  
              </ul>
          <Logout/>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

function Logout(){
    const handleLogout = () => {
        Swal.fire({
          title: 'Do you want to logout?',
          showCancelButton: true,
          confirmButtonText: 'Yes'
        }).then((result) => {
          if (result.isConfirmed) {
            // Handle the logout logic here, e.g., clearing user session, redirecting, etc.
            Swal.fire('Logged out!', '', 'success');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/';
          }
        });
      };

      return (
        <div onClick={handleLogout}>
          <div className='bi-box-arrow-right text-whites mt-3 ps-4'>&ensp; Keluar</div> 
        </div>
      );
    
};


export default Sidebar;
