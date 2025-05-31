import React, { useState } from 'react';
import RegistrationForm from '../components/RegistrationFrom'
import {
    Card, CardLink, CardBody, CardTitle,
    FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody
} from 'reactstrap';
import AuthService from '../utils/auth';
import { login } from '../api/userApi';

const Login = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = () => setModalOpen(!modalOpen);

    const [formData, setFormData] = useState({
        email_address: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login(formData);
            AuthService.login(res.data.token);
        } catch (err) {
            console.error('Login failed:', err);
            alert('Invalid credentials');
        }
    };

    return (
        <>
            <Card id="login-card">
                <CardBody>
                    <CardTitle tag="h5">Login</CardTitle>
                </CardBody>
                <CardBody>
                    <form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                id="email"
                                name="email_address"
                                placeholder="email"
                                type="email"
                                value={formData.email_address}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                placeholder="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                        <Button type="submit" color="primary">Login</Button>
                    </form>
                </CardBody>
                <CardLink href="#" onClick={toggleModal}>
                    Don't have an account? Create one here
                </CardLink>
            </Card>

            <Modal isOpen={modalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Create an Account</ModalHeader>
                <ModalBody>
                    <RegistrationForm onSuccess={toggleModal} />
                </ModalBody>
            </Modal>
        </>
    );
};

export default Login;
