import React, { useState } from 'react';
import {
  Card, CardBody, CardTitle, FormGroup, Label, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button
} from 'reactstrap';

const TransferHorse = () => {
  const [horseDropdownOpen, setHorseDropdownOpen] = useState(false);
  const [memberDropdownOpen, setMemberDropdownOpen] = useState(false);
  const [selectedHorse, setSelectedHorse] = useState('');
  const [selectedMember, setSelectedMember] = useState('');

  const toggleHorseDropdown = () => setHorseDropdownOpen(!horseDropdownOpen);
  const toggleMemberDropdown = () => setMemberDropdownOpen(!memberDropdownOpen);

  const handleHorseSelect = (horse) => {
    setSelectedHorse(horse);
  };

  const handleMemberSelect = (member) => {
    setSelectedMember(member);
  };

  const handleTransfer = () => {
    //Implement this function
  };

  return (
    <Card id="horse--main-card">
      <CardBody>
        <CardTitle tag="h5">Transfer Horse Ownership</CardTitle>

        <FormGroup>
          <Label for="horseSelect">Select Horse</Label>
          <Dropdown isOpen={horseDropdownOpen} toggle={toggleHorseDropdown}>
            <DropdownToggle caret>
              {selectedHorse || 'Choose a horse'}
            </DropdownToggle>
            <DropdownMenu>
              {/* Placeholder horse names — replace with dynamic data */}
              <DropdownItem onClick={() => handleHorseSelect('Thunder')}>Thunder</DropdownItem>
              <DropdownItem onClick={() => handleHorseSelect('Bella')}>Bella</DropdownItem>
              <DropdownItem onClick={() => handleHorseSelect('Midnight')}>Midnight</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </FormGroup>

        <FormGroup>
          <Label for="memberSelect">Select New Owner</Label>
          <Dropdown isOpen={memberDropdownOpen} toggle={toggleMemberDropdown}>
            <DropdownToggle caret>
              {selectedMember || 'Choose a member'}
            </DropdownToggle>
            <DropdownMenu>
              {/* Placeholder member names — replace with dynamic data */}
              <DropdownItem onClick={() => handleMemberSelect('John Doe')}>John Doe</DropdownItem>
              <DropdownItem onClick={() => handleMemberSelect('Jane Smith')}>Jane Smith</DropdownItem>
              <DropdownItem onClick={() => handleMemberSelect('Alex Johnson')}>Alex Johnson</DropdownItem>
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
