import React from 'react';
import { Card, CardLink, CardBody, CardTitle, FormGroup, Label, Input } from 'reactstrap';

const Login = () => {
    return (

        <Card id="login-card">
            <CardBody>
                <CardTitle tag="h5">
                    Login
                </CardTitle>
            </CardBody>
            <CardBody>
                <FormGroup>
                    <Label for="password">
                        Email
                    </Label>
                    <Input
                        id="email"
                        name="email"
                        placeholder="email"
                        type="email"
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="password">
                        Password
                    </Label>
                    <Input
                        id="password"
                        name="password"
                        placeholder="password"
                        type="password"
                    />
                </FormGroup>
            </CardBody>
            <CardLink>
                Don't have an account? create one here
            </CardLink>
        </Card>
    );
};

export default Login;