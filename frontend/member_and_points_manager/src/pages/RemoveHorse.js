import React, { useState, useEffect } from 'react';
import { getHorsesByMemberId, deleteHorse } from '../api/horseApi';
import Auth from '../utils/auth';
import {
    Card, CardBody, CardTitle, FormGroup, Label, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button
} from 'reactstrap';

const RemoveHorse = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedHorse, setSelectedHorse] = useState('');
    const [horses, setHorses] = useState([])
    const userId = Auth.getUserId();

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const handleHorseSelect = (horse) => {
        setSelectedHorse(horse);
    };

    useEffect(() => {
        getHorsesByMemberId(userId)
            .then(response => {
                setHorses(response.data);
            })
            .catch(error => {
                console.error("Error fetching horses", error);
            });
    }, [userId]);

    const handleRemove = () => {
        deleteHorse(selectedHorse.horse_id)
            .then(response => {
                alert('Horse deleted successfully!');
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error transferring horse:', error);
                alert('Failed to transfer horse.');
            });
    };

    return (
        <Card id="horse--main-card">
            <CardBody>
                <CardTitle tag="h5">Remove Horse from Member</CardTitle>

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

                <Button color="danger" onClick={handleRemove}>
                    Remove Horse
                </Button>
            </CardBody>
        </Card>
    );
}

    export default RemoveHorse;
