import React, { useState, useEffect } from 'react';
import {
    Card, CardBody, CardTitle, FormGroup, Label, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button
} from 'reactstrap';
import { getHorsesByMemberId, transferHorse } from '../api/horseApi';
import { getAllMembers } from '../api/userApi';

import Auth from '../utils/auth';

const TransferHorse = () => {
    const [horseDropdownOpen, setHorseDropdownOpen] = useState(false);
    const [memberDropdownOpen, setMemberDropdownOpen] = useState(false);
    const [members, setMembers] = useState([]);

    const [selectedHorse, setSelectedHorse] = useState(null);
    const [selectedMember, setSelectedMember] = useState('');
    const [horses, setHorses] = useState([]);

    const userId = Auth.getUserId();

    const toggleHorseDropdown = () => setHorseDropdownOpen(!horseDropdownOpen);
    const toggleMemberDropdown = () => setMemberDropdownOpen(!memberDropdownOpen);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [horsesResponse, membersResponse] = await Promise.all([
                    getHorsesByMemberId(userId),
                    getAllMembers()
                ]);

                setHorses(horsesResponse.data);
                console.log(membersResponse)
                setMembers(membersResponse.data.data);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, [userId]);


    const handleHorseSelect = (horse) => {
        setSelectedHorse(horse);
    };

    const handleMemberSelect = (member) => {
        setSelectedMember(member);
    };

    const handleTransfer = () => {
        if (!selectedHorse || !selectedMember) {
            alert('Please select both a horse and a new owner.');
            return;
        }

        transferHorse(selectedHorse.horse_id, {
            member_id: selectedMember.member_id
        })
            .then(response => {
                alert('Horse transferred successfully!');
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
                <CardTitle tag="h5">Transfer Horse Ownership</CardTitle>

                <FormGroup>
                    <Label for="horseSelect">Select Horse</Label>
                    <Dropdown isOpen={horseDropdownOpen} toggle={toggleHorseDropdown}>
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
                    <Label for="memberSelect">Select New Owner</Label>
                    <Dropdown isOpen={memberDropdownOpen} toggle={toggleMemberDropdown}>
                        <DropdownToggle caret>
                            {selectedMember ? `${selectedMember.first_name} ${selectedMember.last_name}` : 'Choose a member'}
                        </DropdownToggle>
                        <DropdownMenu>
                            {members.map((member) => (
                                <DropdownItem key={member.member_id} onClick={() => handleMemberSelect(member)}>
                                    {member.first_name} {member.last_name}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>

                </FormGroup>

                <Button color="primary" onClick={handleTransfer}>
                    Transfer Horse
                </Button>
            </CardBody>
        </Card>
    );
};

export default TransferHorse;
