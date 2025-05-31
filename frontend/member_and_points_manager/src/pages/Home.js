import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import welcomeImage from '../images/horse_photo.JPG';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import RegistrationForm from '../components/RegistrationFrom'

const Home = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = () => setModalOpen(!modalOpen);
    return (
        <>
            <Container className="mt-5">
                <Row className="align-items-center">
                    <Col md={6}>
                        <h1 className="mb-4">Welcome to Premier Hunter Jumper Association</h1>
                        <p>
                            Manage your horses, track show results, and view performance records all in one place.
                            Whether you're an owner, rider, or enthusiast, our platform helps you stay organized and informed.
                            Become a member today!
                        </p>

                        <div className="d-flex justify-content-center gap-3">
                            <Link to="/login">
                                <Button color="secondary" size="lg">
                                    Login
                                </Button>
                            </Link>
                            <Link>
                                <Button color="secondary" size="lg" onClick={toggleModal}>
                                    Create Account
                                </Button>
                            </Link>
                        </div>

                    </Col>
                    <Col md={6}>
                        <img
                            src={welcomeImage}
                            alt="Horse Show"
                            className="img-fluid rounded shadow"
                        />
                    </Col>
                </Row>
            </Container>

            <Modal isOpen={modalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Create an Account</ModalHeader>
                <ModalBody>
                    <RegistrationForm onSuccess={toggleModal} />
                </ModalBody>
            </Modal>
        </>
    );
};

export default Home;
