import React, { useEffect, useState } from 'react';
import {
    Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button
} from 'reactstrap';
import { getAllShows } from '../api/showsApi'
import { getAllMembers } from '../api/userApi';
import { getAllHorses } from '../api/horseApi';
import { getAllDivisions } from '../api/divisonsApi';
import { getAllClasses } from '../api/classesApi';
import { addResults } from '../api/admin';


const AdminDashboard = () => {
    const [shows, setShows] = useState([]);
    const [divisions, setDivisions] = useState([]);
    const [classes, setClasses] = useState([]);
    const [members, setMembers] = useState([]);
    const [horses, setHorses] = useState([]);

    const [formData, setFormData] = useState({
        owner: '',
        horse_id: '',
        show_name: '',
        division_name: '',
        class_id: '',
        points_earned: '',
        place: '',
        money_awarded: ''
    });

    useEffect(() => {
        Promise.all([
            getAllShows(),
            getAllMembers(),
            getAllHorses(),
            getAllDivisions(),
            getAllClasses()
        ])
            .then(([showsRes, membersRes, horsesRes, divisionsRes, classesRes]) => {
                setShows(showsRes.data);
                setMembers(membersRes.data.data);
                setHorses(horsesRes.data);
                setDivisions(divisionsRes.data);
                setClasses(classesRes.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            entry: {
                class_id: parseInt(formData.class_id),
                member_id: parseInt(formData.owner),
                horse_id: parseInt(formData.horse_id)
            },
            result: {
                place: parseInt(formData.place),
                points_earned: parseFloat(formData.pointsEarned),
                money_awarded: parseFloat(formData.moneyAwarded)
            }
        };

        console.log("TEST Payload", payload);

        try {
            const response = await addResults(payload); 
            if (response.status === 201) {
                alert(`Success: ${response.data.message}`);
            } else {
                alert(`Error: ${response.data.error || 'Unknown error'}`);
            }
        } catch (err) {
            console.error('Submission error:', err);
            alert('Submission failed. Please try again.');
        }
    };




    return (
        <div className="d-flex justify-content-center mt-5" id="admin-card">
            <Card style={{ width: '100%', maxWidth: '600px' }}>
                <CardBody>
                    <CardTitle tag="h3" className="text-center mb-4">
                        Admin Dashboard
                    </CardTitle>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="owner">Owner</Label>
                            <Input
                                type="select"
                                name="owner"
                                value={formData.owner}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select an owner</option>
                                {members.map((member) => (
                                    <option key={member.member_id} value={member.member_id}>
                                        {member.first_name} {member.last_name}
                                    </option>
                                ))}
                            </Input>
                        </FormGroup>

                        <FormGroup>
                            <Label for="horse_id">Horse</Label>
                            <Input
                                type="select"
                                name="horse_id"
                                value={formData.horse_id}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select a horse</option>
                                {horses.map((horse) => (
                                    <option key={horse.horse_id} value={horse.horse_id}>
                                        {horse.horse_name}
                                    </option>
                                ))}
                            </Input>
                        </FormGroup>

                        <FormGroup>
                            <Label for="class_id">Class</Label>
                            <Input
                                type="select"
                                name="class_id"
                                value={formData.class_id}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select a class</option>
                                {classes.map((cls) => (
                                    <option key={cls.class_id} value={cls.class_id}>
                                        {cls.class_name}
                                    </option>
                                ))}
                            </Input>
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

                        <FormGroup>
                            <Label for="place">Place</Label>
                            <Input
                                type="number"
                                name="place"
                                value={formData.place}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="moneyAwarded">Money Awarded</Label>
                            <Input
                                type="number"
                                name="moneyAwarded"
                                value={formData.moneyAwarded}
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
