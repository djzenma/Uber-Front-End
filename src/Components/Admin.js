import React, {Component} from 'react';
import {Form, Button} from "react-bootstrap";
import {Divider} from "@material-ui/core";
import WelcomeCard from "./WelcomeCard";

export  default class Admin extends Component {

    constructor(props) { //con
        super(props);

    }

    render() {  ///ren
        return (
            // Add Admin
            <div className="w-100 container-fluid">
                <div className="row mt-3">
                    <div className="col-4"/>
                    <div className="col-4 pt-5">
                        <h1 className="h1 text-danger">Administrator</h1>
                    </div>
                    <div className="col-1"/>
                    <WelcomeCard className="col-2" name={this.props.profile.name} age={this.props.profile.age} />
                    <div className="col-1"/>
                </div>

                <Form className ="w-50 mx-auto">
                    <h2 className = "h2"> Add Admin</h2>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add
                    </Button>
                </Form>
            <Divider className= "mt-2"/>

            {/* Delete Admin*/}
                <Form className ="w-50 mx-auto">
                    <h2 className = "h2"> Remove Admin</h2>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Button variant="danger" type="submit">
                        Remove
                    </Button>
                </Form>
                <Divider className= "mt-2"/>

                {/* Change Admin Password*/}
                <Form className ="w-50 mx-auto">
                    <h2 className = "h2"> Change Admin Password</h2>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="New Password" />
                    </Form.Group>

                    <Button variant="success" type="submit">
                        Change
                    </Button>
                </Form>
                <Divider className= "mt-2"/>

                {/* Add Driver*/}
                <Form className ="w-50 mx-auto">
                    <h2 className = "h2"> Add Driver</h2>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add
                    </Button>
                </Form>
                <Divider className="mt-2"/>


                {/* Delete Driver*/}
                <Form className ="w-50 mx-auto">
                    <h2 className = "h2"> Remove Driver</h2>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Button variant="danger" type="submit">
                        Remove
                    </Button>
                </Form>
                <Divider className= "mt-2"/>

                {/* Add Credit to Rider/Driver*/}
                <Form className ="w-50 mx-auto">
                    <h2 className = "h2">  Add Credit to Rider/Driver</h2>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="number" placeholder="Amount" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add
                    </Button>
                </Form>
                <Divider className= "mt-2"/>


                {/* Add PromoCode */}
                <Form className ="w-50 mx-auto">
                    <h2 className = "h2"> Add PromoCode</h2>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Code</Form.Label>
                        <Form.Control type="text" placeholder="Enter Code" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="number" placeholder="Amount" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add
                    </Button>
                </Form>
                <Divider className= "mt-2"/>

                {/* Remove PromoCode */}
                <Form className ="w-50 mx-auto">
                    <h2 className = "h2"> Remove PromoCode</h2>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Code</Form.Label>
                        <Form.Control type="text" placeholder="Enter Code" />
                    </Form.Group>

                    <Button variant="danger" type="submit">
                        Remove
                    </Button>
                </Form>
                <Divider className= "mt-2"/>

                {/* Change PromoCode */}
                <Form className ="w-50 mx-auto">
                    <h2 className = "h2"> Change PromoCode</h2>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Code</Form.Label>
                        <Form.Control type="text" placeholder="Enter Code" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>New Amount</Form.Label>
                        <Form.Control type="number" placeholder="Amount" />
                    </Form.Group>
                    <Button variant="success" type="submit">
                        Add
                    </Button>
                </Form>
                <Divider className= "mt-2"/>

            </div>
        );
    }

}

