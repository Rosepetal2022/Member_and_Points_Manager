import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import { addHorse } from '../api/horseApi';
import Auth from '../utils/auth'; // ✅ Import Auth to get user ID

const AddHorse = () => {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [sex, setSex] = useState('');
    const [formData, setFormData] = useState({
        horse_name: '',
        foaled_date: '',
        color: '',
        hands: '',
        horse_size: '',
        breed: ''
    });

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const handleSexSelect = (value) => {
        setSex(value);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const userId = Auth.getUserId(); 
        const newHorse = {
            ...formData,
            sex,
            member_id: userId 
        };

        addHorse(newHorse)
            .then((res) => {
                console.log('Horse added successfully:', res.data);
                setSuccessMessage('Horse added successfully!');
                setFormData({
                    horse_name: '',
                    foaled_date: '',
                    color: '',
                    hands: '',
                    horse_size: '',
                    breed: ''
                });
                setSex('');
                navigate("/MemberHome")
            })
            .catch((err) => {
                console.error('Error adding horse:', err);
            });
    };

    return (
        <Card id="horse--main-card">
            <CardBody>
                <CardTitle tag="h5">Add New Horse</CardTitle>
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="horse_name">Horse Name</Label>
                        <Input type="text" id="horse_name" value={formData.horse_name} onChange={handleChange} placeholder="Enter horse name" />
                    </FormGroup>

                    <FormGroup>
                        <Label for="foaled_date">Foaled Date</Label>
                        <Input type="date" id="foaled_date" value={formData.foaled_date} onChange={handleChange} />
                    </FormGroup>

                    <FormGroup>
                        <Label for="sex">Sex</Label>
                        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                            <DropdownToggle caret>
                                {sex || 'Select Sex'}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => handleSexSelect('Mare')}>Mare</DropdownItem>
                                <DropdownItem onClick={() => handleSexSelect('Gelding')}>Gelding</DropdownItem>
                                <DropdownItem onClick={() => handleSexSelect('Stallion')}>Stallion</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </FormGroup>

                    <FormGroup>
                        <Label for="color">Color</Label>
                        <Input type="text" id="color" value={formData.color} onChange={handleChange} placeholder="Enter color" />
                    </FormGroup>

                    <FormGroup>
                        <Label for="hands">Height (hands)</Label>
                        <Input type="number" step="0.1" id="hands" value={formData.hands} onChange={handleChange} placeholder="e.g., 15.2" />
                    </FormGroup>

                    <FormGroup>
                        <Label for="horse_size">Horse/Pony Size</Label>
                        <Input type="text" id="horse_size" value={formData.horse_size} onChange={handleChange} placeholder="e.g., Small" />
                    </FormGroup>

                    <FormGroup>
                        <Label for="breed">Breed</Label>
                        <Input type="text" id="breed" value={formData.breed} onChange={handleChange} placeholder="e.g., Thoroughbred" />
                    </FormGroup>

                    <Button color="primary" type="submit">Submit</Button>
                </Form>
            </CardBody>
        </Card>
    );
};

export default AddHorse;
