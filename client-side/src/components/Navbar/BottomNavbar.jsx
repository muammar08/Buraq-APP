import { useState } from 'react';
import { Modal, Col, Row, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Swal from 'sweetalert2';

function BottomNavbar({ show, onHide, setSearchTerm }) {
  const [showModal, setShowModal] = useState(false);
  const [searchInput, setSearchInput] = useState(''); // Define the state for the search input

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSearchSubmit = () => {
    setSearchTerm(searchInput);
    onHide(); // Close the modal after submitting
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value); // Update the search input state
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
        localStorage.removeItem('user');
        window.location.href = '/';
      }
    });
  };

  return (
    <>
      <Navbar className="fixed-bottom justify-content-center" style={{ backgroundColor: '#1d3557' }}>
        <Container className='justify-content-center'>
          <Row className='align-items-center'>
            <Col className='me-3 ms-3'>
              <div className='bi bi-house fs-2 text-light' onClick={() => {window.location.href= '/dashboardKurir'}}></div>
            </Col>
            <Col className='me-3 ms-3'>
              <div className='bi bi-search fs-2 text-light' onClick={handleShowModal}></div>
            </Col>
            <Col className='me-3 ms-3'>
              <div className='bi bi-box-arrow-right fs-2 text-light' onClick={handleLogout}></div>
            </Col>
          </Row>
        </Container>
      </Navbar>

      <Modal show={showModal} onHide={handleCloseModal} size='sm' centered>
        <Modal.Body>
          <Row>
            <Col>
              <div>
                <input
                  size={27}
                  className="rounded-pill border-0 p-2"
                  name="search"
                  type="text"
                  placeholder="&ensp;Search..."
                  value={searchInput} // Set the value to the search input state
                  onChange={handleSearchChange} // Update the search input state
                />
              </div>
            </Col>
            <Col>
              <Button type='button' className='bi bi-search' size='md' onClick={handleSearchSubmit}></Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default BottomNavbar;
