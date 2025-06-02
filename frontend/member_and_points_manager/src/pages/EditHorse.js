import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import { getHorsesByMemberId, updateHorse } from '../api/horseApi';
import Auth from '../utils/auth';

const EditHorse = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [sexDropdownOpen, setSexDropdownOpen] = useState(false);
    const [selectedHorse, setSelectedHorse] = useState(null);
    const [horses, setHorses] = useState([]);
    const navigate = useNavigate();

    // Form field states
    const [horseName, setHorseName] = useState('');
    const [foaledDate, setFoaledDate] = useState('');
    const [sex, setSex] = useState('');
    const [color, setColor] = useState('');
    const [hands, setHands] = useState('');
    const [horseSize, setHorseSize] = useState('');
    const [breed, setBreed] = useState('');

    const userId = Auth.getUserId();

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const toggleSexDropdown = () => setSexDropdownOpen(!sexDropdownOpen);

    useEffect(() => {
        getHorsesByMemberId(userId)
            .then(response => {
                setHorses(response.data);
            })
            .catch(error => {
                console.error("Error fetching horses", error);
            });
    }, [userId]);

    const handleHorseSelect = (horse) => {
        setSelectedHorse(horse);
        setHorseName(horse.horse_name || '');
        setFoaledDate(horse.foaled_date ? horse.foaled_date.split('T')[0] : '');
        setSex(horse.sex || '');
        setColor(horse.color || '');
        setHands(horse.hands || '');
        setHorseSize(horse.horse_size || '');
        setBreed(horse.breed || '');
    };

    const handleSexSelect = (value) => {
        setSex(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedHorse) {
            alert('Please select a horse to update.');
            return;
        }

        const formData = {
            horse_name: horseName,
            foaled_date: foaledDate,
            sex: sex,
            color: color,
            hands: hands,
            horse_size: horseSize,
            breed: breed
        };

        try {
            await updateHorse(selectedHorse.horse_id, formData);
            alert('Horse updated successfully!');
            navigate("/MemberHome")
        } catch (error) {
            console.error('Error updating horse:', error);
            alert('Failed to update horse.');
        }
    };


    return (
        <Card id="horse--main-card">
            <CardBody>
                <CardTitle tag="h5">Update Horse</CardTitle>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="horseSelect">Select Horse</Label>
                        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                            <DropdownToggle caret>
                                {selectedHorse?.horse_name || 'Choose a horse'}
                            </DropdownToggle>
                            <DropdownMenu>
                                {horses.map((horse) => (
                                    <DropdownItem key={horse.horse_id} onClick={() => handleHorseSelect(horse)}>
                                        {horse.horse_name}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </FormGroup>

                    <FormGroup>
                        <Label for="horseName">Horse Name</Label>
                        <Input
                            type="text"
                            id="horseName"
                            value={horseName}
                            onChange={(e) => setHorseName(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="foaledDate">Foaled Date</Label>
                        <Input
                            type="date"
                            id="foaledDate"
                            value={foaledDate}
                            onChange={(e) => setFoaledDate(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="sex">Sex</Label>
                        <Dropdown isOpen={sexDropdownOpen} toggle={toggleSexDropdown}>
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
                        <Input
                            type="text"
                            id="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="hands">Height (hands)</Label>
                        <Input
                            type="number"
                            step="0.1"
                            id="hands"
                            value={hands}
                            onChange={(e) => setHands(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="horseSize">Horse Size</Label>
                        <Input
                            type="text"
                            id="horseSize"
                            value={horseSize}
                            onChange={(e) => setHorseSize(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="breed">Breed</Label>
                        <Input
                            type="text"
                            id="breed"
                            value={breed}
                            onChange={(e) => setBreed(e.target.value)}
                        />
                    </FormGroup>

                    <Button color="primary">Update Horse</Button>
                </Form>
            </CardBody>
        </Card>
    );
};

export default EditHorse;
