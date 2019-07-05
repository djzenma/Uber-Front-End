import React, {Component} from 'react';
import {Form, Button, InputGroup} from 'react-bootstrap';
import {Divider, Paper} from '@material-ui/core';
import WelcomeCard from "./WelcomeCard";

export default class Profile extends Component{
    constructor(props) {
        super(props);

        this.onProfileChange = this.onProfileChange.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.send = this.send.bind(this);

        this.state = {
            modifyInputFields: {
                email: false,
                password: false,
                name: false,
                birthDate: false
            },
            newPass: ''
        };
    }

    onProfileChange(field) {
        this.setState(prevState => {
            prevState.modifyInputFields[field] = true;
            return prevState;
        });
    }

    onChangePassword() {
        const url = this.props.baseUrl + '/' + this.props.role + '/modify';
        const body = {email: this.props.profile.email, password: this.state.newPass};
        const onSuccess = () => {console.log(this.props.profile.email + "'s Password Changed!")};
        const onFalure = () => {console.log("Failed to Change your Password!")};
        this.send(url, body, 'PUT', onSuccess, onFalure);
    }

    send(url, body, method, onSuccess, onFailure) {
        fetch( url,
            { method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
            .then((res)=> {
                if(res.status === 200)
                    onSuccess();
                else
                    onFailure();
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
            <div className="w-100 h-100 container">
                <div className="row">
                    <div className="col-7 row unsplashImage">
                    </div>

                    <Paper className="col-5" elevation={6}>
                        <h1 className="h2 text-danger mt-3 mb-5">Modify My Profile</h1>
                        <Form className="mx-auto mb-3">
                            {/*Name*/}
                            <InputGroup className="mt-3">
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
                                    <Form.Control type="password" placeholder="Enter new password" onChange={(e) => {
                                        this.setState({newPass: e.target.value});
                                    }}/>
                                </Form.Group>
                            </div>

                            <Button className="d-block mx-auto mt-3" variant="primary" type="submit" onClick={(e) => {
                                this.onChangePassword();
                                e.preventDefault();
                            }}>
                                Submit
                            </Button>

                        </Form>
                    </Paper>
                </div>
            </div>
        );
    }

}
