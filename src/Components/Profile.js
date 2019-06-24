import React, {Component} from 'react';
import {Form, Button, InputGroup} from 'react-bootstrap';
import {Divider} from '@material-ui/core';

export default class Profile extends Component{
    constructor(props) {
        super(props);

        this.onProfileChange = this.onProfileChange.bind(this);

        this.state = {
            modifyInputFields: {
                email: false,
                password: false,
                name: false,
                birthDate: false
            },
        };
    }

    onProfileChange(field) {
        this.setState(prevState => {
            prevState.modifyInputFields[field] = true;
            return prevState;
        });
    }


    render() {
        let nameField = <Form.Control plaintext readOnly defaultValue={this.props.profile.name}/>;
        let birthdateField = <Form.Control plaintext readOnly defaultValue={this.props.profile.birthDate}/>;
        let emailField = <Form.Control plaintext readOnly defaultValue={this.props.profile.email}/>;
        let passField = <Button className="bg-transparent mt-3" style={{"color": "blue"}}
                                onClick={() => this.onProfileChange('password')}>Change my password</Button>;


        if(this.state.modifyInputFields.email)
            emailField = <Form.Control type="email" placeholder={this.props.profile.email}/>;
        if(this.state.modifyInputFields.name)
            nameField = <Form.Control placeholder={this.props.profile.name}/>;
        if(this.state.modifyInputFields.birthDate)
            birthdateField = <Form.Control placeholder={this.props.profile.birthDate}/>;


        return (
            <div className="container-fluid m-4">
                <Form className="w-50 mx-auto">
                    {/*Name*/}
                    <InputGroup>
                        <Form.Label column sm="2">
                            Name
                        </Form.Label>
                        {nameField}
                        <InputGroup.Append>
                            <Button onClick={() => this.onProfileChange('name')}>Change</Button>
                        </InputGroup.Append>
                    </InputGroup>

                    <Divider/>

                    {/*BirthDate*/}
                    <InputGroup className="mt-3">
                        <Form.Label column sm="2">
                            Birth Date
                        </Form.Label>
                        {birthdateField}
                        <InputGroup.Append>
                            <Button onClick={() => this.onProfileChange('birthDate')}>Change</Button>
                        </InputGroup.Append>
                    </InputGroup>

                    <Divider/>

                    {/*Email*/}
                    <InputGroup className="mt-3">
                        <Form.Label column sm="2">
                            Email
                        </Form.Label>
                        {emailField}
                        <InputGroup.Append>
                            <Button onClick={() => this.onProfileChange('email')}>Change</Button>
                        </InputGroup.Append>
                    </InputGroup>

                    <Divider/>

                    {/*Change Password Btn*/}
                    {passField}


                    <div className="mt-3" hidden={!this.state.modifyInputFields.password}>

                        {/*Old Password*/}
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="password" placeholder="Enter old password" />
                        </Form.Group>

                        {/*New Password*/}
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="password" placeholder="Enter new password" />
                        </Form.Group>
                    </div>

                    <Button className="d-block mx-auto mt-3" variant="primary" type="submit">
                        Submit
                    </Button>

                </Form>
            </div>
        );
    }

}