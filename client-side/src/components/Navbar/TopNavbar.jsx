import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Swal from 'sweetalert2';

function TopNavbar({ setSearchTerm }) {

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Do you want to logout?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
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
    <Navbar className="fixed-top justify-content-center" style={{ backgroundColor: '#1d3557' }}>
      <Container className="justify-content-center">
        <Row className="align-items-center">
          <Col className="">
            <div className="bi bi-truck fs-2 text-light"></div>
          </Col>
          <Col className="">
            <div>
              <input
                size={20}
                className="rounded-pill border-0 p-2"
                name="search"
                type="text"
                placeholder="&ensp;Search..."
                onChange={handleSearch}
              />
            </div>
          </Col>
          <Col className="">
            <div className="bi bi-box-arrow-right fs-2 text-light" onClick={handleLogout}></div>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default TopNavbar;
