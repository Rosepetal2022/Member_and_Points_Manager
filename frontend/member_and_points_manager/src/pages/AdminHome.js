import React, { useState } from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';

const AdminDashboard = () => {
  const [formData, setFormData] = useState({
    owner: '',
    horseName: '',
    showName: '',
    division: '',
    pointsEarned: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <Card style={{ width: '100%', maxWidth: '600px' }}>
        <CardBody>
          <CardTitle tag="h3" className="text-center mb-4">
            Admin Dashboard
          </CardTitle>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="owner">Owner</Label>
              <Input
                type="text"
                name="owner"
                value={formData.owner}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="horseName">Horse Name</Label>
              <Input
                type="text"
                name="horseName"
                value={formData.horseName}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="showName">Show Name</Label>
              <Input
                type="text"
                name="showName"
                value={formData.showName}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="division">Division</Label>
              <Input
                type="text"
                name="division"
                value={formData.division}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="pointsEarned">Points Earned</Label>
              <Input
                type="number"
                name="pointsEarned"
                value={formData.pointsEarned}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <Button color="primary" type="submit" block>
              Submit
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AdminDashboard;
