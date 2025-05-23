import React, { useState } from 'react';
import {
  Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

const AddHorse = () => {
  /*TODO: Add DB Route to add horse to the database */
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sex, setSex] = useState('');

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleSexSelect = (value) => {
    setSex(value);
  };

  return (
    <Card id="horse--main-card">
      <CardBody>
        <CardTitle tag="h5">Add New Horse</CardTitle>
        <Form>
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
            <Input type="text" id="color" placeholder="Enter color" />
          </FormGroup>

          <FormGroup>
            <Label for="hands">Height (hands)</Label>
            <Input type="number" step="0.1" id="hands" placeholder="e.g., 15.2" />
          </FormGroup>

          <FormGroup>
            <Label for="horseSize">Horse/Pony Size</Label>
            <Input type="text" id="horseSize" placeholder="e.g., Small" />
          </FormGroup>

          <FormGroup>
            <Label for="breed">Breed</Label>
            <Input type="text" id="breed" placeholder="e.g., Thoroughbred" />
          </FormGroup>

          <Button color="primary">Submit</Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default AddHorse;

