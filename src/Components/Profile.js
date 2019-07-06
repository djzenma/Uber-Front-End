import React, {Component} from 'react';
import {Form, Button, InputGroup} from 'react-bootstrap';
import {Divider, Paper} from '@material-ui/core';
import WelcomeCard from "./WelcomeCard";

export default class Profile extends Component{
    constructor(props) {
        super(props);

        this.onProfileChange = this.onProfileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.send = this.send.bind(this);

        this.state = {
            modifyInputFields: {
                email: false,
                password: false,
                name: false,
                birthDate: false
            },
            newPass: this.props.profile.passcode,
            name: this.props.profile.name,
            birth: this.props.profile.birthDate.substr(0,10)
        };

    }

    onProfileChange(field) {
        this.setState(prevState => {
            prevState.modifyInputFields[field] = true;
            return prevState;
        });
    }

    onSubmit() {
        const url = this.props.baseUrl + '/' + this.props.role + '/modify';
        const pass = (this.state.newPass === undefined)? this.props.profile.passcode : this.state.newPass;
        const body = {email: this.props.profile.email, password: pass,
                        birth: this.state.birth, name: this.state.name};
        const onSuccess = () => {
            console.log("Profile Info Updated!");
            this.props.redirectToMap();
        };
        const onFalure = () => {console.log("Failed to Update your profile!")};
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
        let birthdateField = <Form.Control plaintext readOnly defaultValue={this.props.profile.birthDate.substr(0,10)}/>;
        let emailField = <Form.Control plaintext readOnly defaultValue={this.props.profile.email}/>;
        let passField = <Button className="bg-transparent mt-3" style={{"color": "blue"}}
                                onClick={() => this.onProfileChange('password')}>Change my password</Button>;


        if(this.state.modifyInputFields.name)
            nameField = <Form.Control placeholder={this.props.profile.name} onChange={(e) => {
                this.setState({name: e.target.value});
            }}/>;
        if(this.state.modifyInputFields.birthDate)
            birthdateField = <Form.Control placeholder={this.props.profile.birthDate} onChange={(e) => {
                this.setState({birth: e.target.value});
            }}/>;


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
                            </InputGroup>

                            <Divider/>

                            {/*Change Password Btn*/}
                            {passField}


                            <div className="mt-3" hidden={!this.state.modifyInputFields.password}>

                                {/*Old Password*/}
                                <Form.Group controlId="oldPass">
                                    <Form.Control type="password" placeholder="Enter old password" />
                                </Form.Group>

                                {/*New Password*/}
                                <Form.Group controlId="newPass">
                                    <Form.Control type="password" placeholder="Enter new password" onChange={(e) => {
                                        console.log(e.target.value);
                                        if(this.state.modifyInputFields.password && e.target.value !== undefined)
                                            this.setState({newPass: e.target.value});
                                        else
                                            this.setState({newPass: this.props.profile.passcode});
                                    }}/>
                                </Form.Group>
                            </div>

                            <Button className="d-block mx-auto mt-3" variant="primary" type="submit" onClick={(e) => {
                                this.onSubmit();
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
