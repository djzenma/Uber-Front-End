import React, {Component} from 'react';
import '../App.css';
import WelcomeCard from "./WelcomeCard";
import MyForm from './MyForm';
import {Paper} from '@material-ui/core';

export  default class Admin extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="w-100 container-fluid">
                <div className="row">
                    <div className="col-7 row unsplashImage">
                        <div className="col-1"/>
                        <div className="mt-3">
                            <WelcomeCard className="col-4" name={this.props.profile.name} age={this.props.profile.age} />
                        </div>
                    </div>

                    <Paper className="col-5" elevation={6}>
                        <h1 className="h2 text-danger mt-3 mb-3">Administrator</h1>

                        {/* Add Admin*/}
                        <MyForm heading="Add Admin" formGroups={[
                            {id:"formBasicEmail", label: "Email address", type: "email", placeHolder: "Enter email"},
                            {id:"formBasicPassword", label: "Password", type: "password", placeHolder: "Password"}]}
                                btnColor="primary" btnTxt="Add"/>


                        {/* Delete Admin*/}
                        <MyForm heading="Remove Admin" formGroups={[
                            {id:"formBasicEmail2", label: "Email address", type: "email", placeHolder: "Enter email"}]}
                                btnColor="danger" btnTxt="Remove"/>

                        {/* Change Admin Password*/}
                        <MyForm heading="Change Admin Password" formGroups={[
                            {id:"formBasicEmail3", label: "Email address", type: "email", placeHolder: "Enter email"},
                            {id:"formBasicPassword3", label: "Password", type: "password", placeHolder: "New Password"}]}
                                btnColor="success" btnTxt="Change"/>

                        {/* Add Driver*/}
                        <MyForm heading="Add Driver" formGroups={[
                            {id:"formBasicEmail4", label: "Email address", type: "email", placeHolder: "Enter email"},
                            {id:"formBasicPassword4", label: "Password", type: "password", placeHolder: "Password"}]}
                                btnColor="primary" btnTxt="Add"/>

                        {/* Delete Driver*/}
                        <MyForm heading="Remove Driver" formGroups={[
                            {id:"formBasicEmail5", label: "Email address", type: "email", placeHolder: "Enter email"}]}
                                btnColor="danger" btnTxt="Remove"/>

                        {/* Add Credit to Rider/Driver*/}
                        <MyForm heading="Add Credit to Rider/Driver" formGroups={[
                            {id:"formBasicEmail6", label: "Email address", type: "email", placeHolder: "Enter email"},
                            {id:"formBasicPassword6", label: "Amount", type: "number", placeHolder: "Amount"}]}
                                btnColor="primary" btnTxt="Add"/>

                        {/* Add PromoCode */}
                        <MyForm heading="Add PromoCode" formGroups={[
                            {id:"formBasicEmail7", label: "Code", type: "text", placeHolder: "Enter Code"},
                            {id:"formBasicPassword7", label: "Amount", type: "number", placeHolder: "Amount"}]}
                                btnColor="primary" btnTxt="Add"/>

                        {/* Remove PromoCode */}
                        <MyForm heading="Remove PromoCode" formGroups={[
                            {id:"formBasicEmail8", label: "Code", type: "text", placeHolder: "Enter Code"}]}
                                btnColor="danger" btnTxt="Remove"/>

                        {/* Change PromoCode */}
                        <MyForm heading="Change PromoCode" formGroups={[
                            {id:"formBasicEmail9", label: "Code", type: "text", placeHolder: "Enter Code"},
                            {id:"formBasicPassword9", label: "New Amount", type: "number", placeHolder: "Amount"}]}
                                btnColor="success" btnTxt="Add"/>
                    </Paper>
                </div>

            </div>
        );
    }

}

