import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';


const Sidebar = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh'}}>
      <CDBSidebar textColor="#fff" backgroundColor="#1d3557" style={{ overflowY: 'auto' , overscrollBehaviorY: 'contain' }}>
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/dashboardAdmin" className="text-decoration-none" style={{ color: 'inherit' }}>Buraq</a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content" >
          <CDBSidebarMenu>
            <NavLink exact to="/dashboardAdmin" activeClassName="">
              <CDBSidebarMenuItem><class class='bi-card-list fs-5'></class> &ensp;  Daftar Barang</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/inputBarang" activeClassName="activeClicked">
              <CDBSidebarMenuItem><class class='bi-cart-plus fs-5'></class> &ensp; Input Barang</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/daftarBarangKurir" activeClassName="activeClicked">
              <CDBSidebarMenuItem><class class='bi-box-seam-fill fs-5'></class> &ensp; Pilih Kurir</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/riwayat" activeClassName="activeClicked">
              <CDBSidebarMenuItem><class class='bi-calendar2-check fs-5'></class> &ensp; Riwayat</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/daftarKurir" activeClassName="activeClicked">
              <CDBSidebarMenuItem><class class='bi-person-lines-fill fs-5'></class> &ensp; Daftar Kurir</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/daftarSuplier" activeClassName="activeClicked">
              <CDBSidebarMenuItem><class class='bi-building fs-5'></class> &ensp; Daftar Suplier</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/register" activeClassName="activeClicked">
              <CDBSidebarMenuItem><class class='bi-person-add fs-5'></class> &ensp; Register</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="#" activeClassName="activeClicked">
              <Logout/>
            </NavLink>

          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
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
            window.location.href = '/';
          }
        });
      };

      return (
        <CDBSidebarMenuItem onClick={handleLogout}>
          <class class='bi-box-arrow-right fs-5'></class> &ensp; Keluar
        </CDBSidebarMenuItem>
      );
    
};

export default Sidebar;
