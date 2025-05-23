import React, { useState } from 'react';
import {
  Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

const EditHorse = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sexDropdownOpen, setSexDropdownOpen] = useState(false);
  const [selectedHorse, setSelectedHorse] = useState('');
  const [sex, setSex] = useState('');

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleSexDropdown = () => setSexDropdownOpen(!sexDropdownOpen);

  const handleHorseSelect = (horse) => {
    setSelectedHorse(horse);
    // You would populate the form fields here based on the selected horse
  };

  const handleSexSelect = (value) => {
    setSex(value);
  };

  return (
    <Card id="horse--main-card">
      <CardBody>
        <CardTitle tag="h5">Update Horse</CardTitle>
        <Form>
          <FormGroup>
            <Label for="horseSelect">Select Horse</Label>
            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
              <DropdownToggle caret>
                {selectedHorse || 'Choose a horse'}
              </DropdownToggle>
              <DropdownMenu>
                {/* Placeholder items — replace with dynamic list */}
                <DropdownItem onClick={() => handleHorseSelect('Horse 1')}>Horse 1</DropdownItem>
                <DropdownItem onClick={() => handleHorseSelect('Horse 2')}>Horse 2</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </FormGroup>

          <FormGroup>
            <Label for="horseName">Horse Name</Label>
            <Input type="text" id="horseName" placeholder="Enter horse name" />
          </FormGroup>

          <FormGroup>
            <Label for="foaledDate">Foaled Date</Label>
            <Input type="date" id="foaledDate" />
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
            <Input type="text" id="color" placeholder="Enter color" />
          </FormGroup>

          <FormGroup>
            <Label for="hands">Height (hands)</Label>
            <Input type="number" step="0.1" id="hands" placeholder="e.g., 15.2" />
          </FormGroup>

          <FormGroup>
            <Label for="horseSize">Horse Size</Label>
            <Input type="text" id="horseSize" placeholder="e.g., Medium" />
          </FormGroup>

          <FormGroup>
            <Label for="breed">Breed</Label>
            <Input type="text" id="breed" placeholder="e.g., Quarter Horse" />
          </FormGroup>

          <Button color="primary">Update Horse</Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default EditHorse;
