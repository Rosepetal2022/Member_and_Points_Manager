import React, { useState } from 'react';
import {
  Card, CardBody, CardTitle, FormGroup, Label, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button
} from 'reactstrap';

const RemoveHorse = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedHorse, setSelectedHorse] = useState('');

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleHorseSelect = (horse) => {
    setSelectedHorse(horse);
  };

  const handleRemove = () => {
    //TODO: Implement this function
  };

  return (
    <Card id="horse--main-card">
      <CardBody>
        <CardTitle tag="h5">Remove Horse from Member</CardTitle>

        <FormGroup>
          <Label for="horseSelect">Select Horse</Label>
          <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
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

        <Button color="danger" onClick={handleRemove}>
          Remove Horse
        </Button>
      </CardBody>
    </Card>
  );
};

export default RemoveHorse;
