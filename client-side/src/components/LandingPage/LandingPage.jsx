import React, {useState} from 'react'
import { Button, Card, Container, Navbar, NavbarCollapse, Form, Row, Col} from 'react-bootstrap';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import truck from '../../assets/truck.png'
import icon1 from '../../assets/icon1.png'
import icon2 from '../../assets/icon2.png'
import bg from '../../assets/bg.png'
import bg2 from '../../assets/bg2.png'
import foto1 from '../../assets/foto1.jpg'
import foto2 from '../../assets/foto2.jpg'
import foto3 from '../../assets/foto3.jpg'
import foto4 from '../../assets/foto4.jpg'


function LandingPage () {

    const sectionStyle = {
        backgroundImage: `url(${truck})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
    };
    const sectionStyle2 = {
        backgroundImage: `url(${bg2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
    };

    return(
        <div>
            <Nav/>
            <div className='p-5 mb-4' style={sectionStyle}>
                <div className='container-fluid py-5'>
                    <div className='row'>
                        <div className='col-lg-6 col-md-8 mx-auto'>
                            <h1 className='fw-bold text-light text-center'>PT. BURAQ NEW CARGO</h1>
                            <p className='lead text-light text-center'>Buraq adalah sebuah aplikasi yang dapat membantu anda dalam mengirim barang.</p>
                            
                        </div>
                    </div>
                </div>
            </div>

            <Container>
                <div className='mt-n5'>
                    <CardResi/>
                </div>
            </Container>

            <div className='mt-5 mb-5'>
                <About/>
            </div>

            <div className='p-5 mb-4' style={sectionStyle2}>
                <div className='py-5 '>
                    <div className=' mx-auto text-end'>
                        <h1 className='fw-bold text-light justify-content-center align-items-center text-center text-sm-end'>Create Meaningful</h1>
                        <h1 className='fw-bold text-light justify-content-center align-items-center text-center text-sm-end'>Experiences for Supplier.</h1>
                        <p className='lead text-light justify-content-center align-items-center text-center text-sm-end'>Focus people by understanding emotions and perspectives at all touch points,<br/> so you can take action and focus experiences on what matters to the people.</p>
                    </div>
                </div>
            </div> 

                <OurGallery/>
                <OurServices/>
                <Map/>
                <Service/>
                <Team/>
                <Footer/>

        </div>
    )
}

function Nav () {
    return(
        <div>
            <Navbar style={{backgroundColor : '#1d3557', boxShadow : ' 0 2px 4px 0'}}>
                <Container>
                    <Navbar.Brand href="#home" className='text-white'> BURAQ </Navbar.Brand>
                    <NavbarCollapse className="justify-content-end"> 
                        <Button href='/'>Login</Button>
                    </NavbarCollapse>
                </Container>
            </Navbar>
        </div>
    )
}

function CardResi () {
    return(
        <Card className='col-md-5 col-15 mx-auto'>
            <div className='d-flex align-items-center'>
                <Card.Body>
                    <Row>
                        <Col xs={8}>
                            <Form.Control type="text" placeholder="Masukkan nomor resi" />
                        </Col>
                        <Col xs={4} className='d-flex justify-content-center'>
                            <Button variant="primary">Lacak</Button>
                        </Col>
                    </Row>
                </Card.Body>
            </div>
        </Card>
    )
}

function About() {
    return(
        <div>
            <Container className='p-1'>
                <Row>
                    <Col xs={12} sm={6} className='d-flex justify-content-center align-items-center text-center text-sm-start'>
                        <div className='mt-5 mb-5'>
                            <h4 className='fw-light' style={{color: '#2a9d8f'}} >Our Journey</h4>
                            <h1 className='fw-bold text-black'>About Company</h1>
                            <p className='mt-5'>Ut enim ad dolore magna aliqua minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.</p>
                        </div>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Row className='mt-5' style={{backgroundImage : `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                            <Col xs={12} md={6} className='p-4'>
                                <Card className='ms-0 ms-md-5 mb-5'>
                                    <Card.Body>
                                        <Card.Img src={icon1} />
                                        <Card.Title className='fw-bold mt-4'>Solusi</Card.Title>
                                        <Card.Text className='fw-light'>
                                            Ut enim ad dolore magna aliqua minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs={12} md={6} className='p-4'>
                                <Card className='ms-0 ms-md-5 mt-5'>
                                    <Card.Body>
                                        <Card.Img src={icon2} className='mb-4' />
                                        <Card.Title className='fw-bold mt-4'>Terpercaya</Card.Title>
                                        <Card.Text className='fw-light'>
                                            Ut enim ad dolore magna aliqua minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

function OurGallery() {

    const images = [foto1, foto2, foto3]; // Ganti dengan path gambar yang sesuai
    const totalImages = images.length;
    const [currentIndex, setCurrentIndex] = useState(0);
    const isMobile = window.innerWidth <= 767; // Misalnya, batas lebar untuk tampilan mobile
  
    const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
    };
  
    const handlePrevious = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
    };


    return(
        <div>
        <Container className='p-1 mt-5'>
          <p className='d-flex justify-content-center text-decoration-underline fw-bold' style={{ color: '#2a9d8f' }}>CheckOut</p>
          <h1 className='fw-bold text-center text-black'>Our Gallery</h1>
          <p className='text-center p-1'>Lorem ipsum dolor sit amet, iracundia porro an vix. Epicuri insolens ex meli persius detracto partem habemus.</p>
          <Row className='d-flex justify-content-center align-items-center'>
            {!isMobile && (
              <>
                <Col className='col-8 col-md-4 mt-2'>
                  <Card>
                    <Card.Img
                      src={images[(currentIndex + totalImages - 1) % totalImages]}
                      style={{ maxHeight: '470px'}}
                    />
                  </Card>
                </Col>
                <Col className='col-8 col-md-4 mt-2'>
                  <Card>
                    <Card.Img
                      src={images[currentIndex]}
                      style={{ maxHeight: '550px'}}
                    />
                    <div className="button-frame-left" onClick={handlePrevious} style={{ position: 'absolute', top: '50%', right: '95%', transform: 'translateY(-50%)' }}>
                        <button
                            style={{
                            boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                            padding: '5px', // Contoh penyesuaian padding
                            borderRadius: '50px', // Contoh penyesuaian border-radius
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'white', // Contoh warna latar belakang tombol
                            border: 'none', // Contoh penghapusan border
                            }}
                            >
                            <BsArrowLeftCircleFill size="30px" />
                        </button>
                    </div>
                    <div className="button-frame-right" onClick={handleNext} style={{ position: 'absolute', top: '50%', left: '95%', transform: 'translateY(-50%)' }}>
                        <button
                            style={{
                            boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                            padding: '5px', // Contoh penyesuaian padding
                            borderRadius: '50px', // Contoh penyesuaian border-radius
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'white', // Contoh warna latar belakang tombol
                            border: 'none', // Contoh penghapusan border
                            }}
                            >
                            <BsArrowRightCircleFill size="30px" />
                        </button>
                    </div>
                  </Card>
                </Col>
                <Col className='col-8 col-md-4 mt-2'>
                  <Card>
                    <Card.Img
                      src={images[(currentIndex + 1) % totalImages]}
                      style={{ maxHeight: '470px'}}
                    />
                  </Card>
                </Col>
              </>
            )}
            {isMobile && (
              <Col className='col-12 mt-2'>
                <Card>
                  <Card.Img
                    src={images[currentIndex]}
                    style={{ maxHeight: '550px' }}
                  />
                  <div className="button-frame-left" onClick={handlePrevious} style={{ position: 'absolute', top: '50%', right: '90%', transform: 'translateY(-50%)' }}>
                        <BsArrowLeftCircleFill className='text-white' size="40px" />
                    </div>
                    <div className="button-frame-right" onClick={handleNext} style={{ position: 'absolute', top: '50%', left: '90%', transform: 'translateY(-50%)' }}>
                        <BsArrowRightCircleFill className='text-white' size="40px" />
                    </div>
                </Card>
              </Col>
            )}
          </Row>
        </Container>
      </div>
    )
}

function OurServices(){
    return(
        <div>
            <Container className='p-1 mt-5'>
                <p className='d-flex justify-content-center text-decoration-underline fw-bold' style={{color: '#2a9d8f'}}>Incredibly</p>
                <h1 className='fw-bold text-center text-black'>Our Services</h1>
                <p className='text-center p-1'>Sed ut perspiciatis aperiam unde omnis istetus error <br/> volupta dolorem que laudantium, totam rem.</p>
                <Row className='d-flex justify-content-center mt-3'>
                    <Col className='col-8 col-md-4 mt-2'>
                        <Card>
                            <Card.Body>
                                <Card.Img src={foto1} style={{ maxHeight: '300px', objectFit: 'cover' }}/>
                                <Card.Title className='fw-semibold text-center mt-2'>Service One</Card.Title>
                                <Card.Text className='text-center'>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className='col-8 col-md-4 mt-2'>
                        <Card>
                            <Card.Body>
                                <Card.Img src={foto2} style={{ maxHeight: '300px', objectFit: 'cover' }}/>
                                <Card.Title className='fw-semibold text-center mt-2'>Service Two</Card.Title>
                                <Card.Text className='text-center'>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className='col-8 col-md-4 mt-2'>
                        <Card>
                            <Card.Body>
                                <Card.Img src={foto3} style={{ maxHeight: '300px', objectFit: 'cover' }}/>
                                <Card.Title className='fw-semibold text-center mt-2'>Service Three</Card.Title>
                                <Card.Text className='text-center'>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

function Map(){
    return(
        <div>
            {/* Create Map From API Google Maps, Show Buraq Cargo Location */}
            <Container className='p-1 mt-5'>
                <p className='d-flex justify-content-center text-decoration-underline fw-bold' style={{color: '#2a9d8f'}}>Find Out Our</p>
                <h1 className='fw-bold text-center text-black'>Our Location</h1>
                <p className='text-center p-1'>Sed ut perspiciatis aperiam unde omnis istetus error <br/> volupta dolorem que laudantium, totam rem.</p>

                <Row className='d-flex justify-content-center'>
                    <Col className='col-8 col-md-6 mt-2'>
                        <Card>
                            <Card.Body>
                                // Create Map From API Google Maps, Show Buraq Cargo Location
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            </Container>
        </div>
    )
}

function Service(){
    return(
        <div>
                <Row className='gx-0' >
                    <Col xs={12} md={6}>
                        <Card.Img src={foto4} />
                    </Col>
                    <Col xs={12} md={6} className='text-light d-flex align-items-center' style={{backgroundColor: '#1d3557'}}>
                        <div className='p-5'>
                            <p className='text-decoration-underline fw-bold' style={{color: '#2a9d8f'}}>Services</p>
                            <h3 className='fw-bold mt-3 mb-3'>Always Deliver Excellent Service</h3>
                            <p className='fw-light'>Lorem ipsum incididunt ut labore et dolore magna aliqua dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br/>Ut enim ad dolore magna aliqua minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo</p>
                        </div>
                    </Col>
                </Row>

        </div>
    )
}

function Team(){
    const [isHovered1, setIsHovered1] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    const [isHovered3, setIsHovered3] = useState(false);

    return(
        <div>
            <Container className='p-5'>
                <div className='mt-5'>
                    <p style={{color:'#2a9d8f'}} className='fw-bold text-decoration-underline'>Dedicated Team </p>
                    <h1 className='fw-bold mb-5 '>Professional Individuals</h1>
                </div>
                <Row className='d-flex justify-content-center mb-5'>
                    <Col className='col-8 col-md-4 mt-2'>
                        <Card.Body style={{ padding: '0', position: 'relative' }}>
                            <Card.Img 
                                src={foto1} 
                                style={{ 
                                    maxHeight: '350px', 
                                    objectFit: 'cover', 
                                    borderRadius: '20px',
                                    opacity: isHovered1 ? '0.8' : '1', // Mengubah opacity saat dihover
                                    transition: 'opacity 0.3s ease-in-out' // Transisi perubahan opacity
                                }}
                                onMouseEnter={() => setIsHovered1(true)} // Mengatur state saat kursor masuk
                                onMouseLeave={() => setIsHovered1(false)} // Mengatur state saat kursor keluar
                            />      
                            <Card.Title className="text-light fw-bold position-absolute bottom-0 start-0 p-3 mb-4" style={{ zIndex: '1'}}>
                             Mour Name
                            </Card.Title>  
                            <Card.Text className="text-light fw-light position-absolute bottom-0 start-0 p-3 ms-1" style={{ zIndex: '1' }}>
                             Mother
                            </Card.Text>  
                        </Card.Body>
                    </Col>
                    <Col className='col-8 col-md-4 mt-2'>
                        <Card.Body style={{ padding: '0', position: 'relative' }}>
                            <Card.Img 
                                src={foto2} 
                                style={{ 
                                    maxHeight: '350px', 
                                    objectFit: 'cover', 
                                    borderRadius: '20px',
                                    opacity: isHovered2 ? '0.8' : '1', // Mengubah opacity saat dihover
                                    transition: 'opacity 0.3s ease-in-out' // Transisi perubahan opacity
                                }}
                                onMouseEnter={() => setIsHovered2(true)} // Mengatur state saat kursor masuk
                                onMouseLeave={() => setIsHovered2(false)} // Mengatur state saat kursor keluar
                            />      
                            <Card.Title className="text-light fw-bold position-absolute bottom-0 start-0 p-3 mb-4" style={{ zIndex: '1'}}>
                             Mour Name
                            </Card.Title>  
                            <Card.Text className="text-light fw-light position-absolute bottom-0 start-0 p-3 ms-1" style={{ zIndex: '1' }}>
                             Mother
                            </Card.Text>   
                        </Card.Body>
                    </Col>
                    <Col className='col-8 col-md-4 mt-2'>
                        <Card.Body style={{ padding: '0', position: 'relative' }}>
                            <Card.Img 
                                src={foto3} 
                                style={{ 
                                    maxHeight: '350px', 
                                    objectFit: 'cover', 
                                    borderRadius: '20px',
                                    opacity: isHovered3 ? '0.8' : '1', // Mengubah opacity saat dihover
                                    transition: 'opacity 0.3s ease-in-out' // Transisi perubahan opacity
                                }}
                                onMouseEnter={() => setIsHovered3(true)} // Mengatur state saat kursor masuk
                                onMouseLeave={() => setIsHovered3(false)} // Mengatur state saat kursor keluar
                            />      
                            <Card.Title className="text-light fw-bold position-absolute bottom-0 start-0 p-3 mb-4" style={{ zIndex: '1'}}>
                             Mour Name
                            </Card.Title>  
                            <Card.Text className="text-light fw-light position-absolute bottom-0 start-0 p-3 ms-1" style={{ zIndex: '1' }}>
                             Mother
                            </Card.Text>    
                        </Card.Body>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

function Footer(){
    return(
        <div style={{backgroundColor: '#1d3557'}}>
            <Container className='pt-5 pb-5 ps-5'>
                <Row className='d-flex justify-content-center text-light ps-5 pt-4 pe-5'>
                    <Col className='col-8 col-sm-4'>
                        <h5 className='fw-bold'>Buraq Cargo</h5>
                        <p className='fw-light mt-3'>Duty the obligations of business will frequently occur that pleasure have too repudiated annoyances endures accepted.</p>
                        <div className='d-grid gap-3'>
                            <div className='d-flex align-items-center'>
                                <div className='bi-telephone-fill fs-4'></div>
                                <div className='flex-grow-1 ms-3 mt-2'><p>+6285212341234</p></div>
                            </div>
                            <div className='d-flex align-items-center'>
                                <div className='bi-printer-fill fs-4'></div>
                                <div className='flex-grow-1 ms-3 mt-2'><p>0641-7523-23</p></div>
                            </div>
                            <div className='d-flex align-items-center mb-4'>
                                <div className='bi-envelope-fill fs-4'></div>
                                <div className='flex-grow-1 ms-3 mt-2'><p>admin@gmail.com</p></div>
                            </div>
                        </div>
                    </Col>
                    <Col className='col-8 col-sm-4'>
                        <div className=''>
                            <h5 className='fw-bold'>Address</h5>
                            <p className='fw-light mt-3 mb-4'>Lamseupeung, Kec. Lueng Bata, Kota Banda Aceh, Aceh 23127</p>
                        </div>
                    </Col>
                    <Col className='col-8 col-sm-4'>
                        <div>
                            <h5 className='fw-bold'>Contact Us</h5>
                            <div className='d-flex'>
                                <div className='bi-facebook fs-3'></div>
                                <div className='bi-instagram fs-3 ms-3'></div>
                                <div className='bi-twitter fs-3 ms-3'></div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <div className='p-3' style={{backgroundColor: '#001d3d'}}>
                <Col className='text-center text-light'>
                © 2021 Buraq Cargo. All Rights Reserved.
                </Col>
            </div>
        </div>
    )
}

export default LandingPage;