import React, {Component} from 'react';
import '../App.css';
import WelcomeCard from "./WelcomeCard";
import MyForm from './MyForm';
import {Paper} from '@material-ui/core';

export  default class Admin extends Component {

    constructor(props) {
        super(props);
        this.onAddAdmin = this.onAddAdmin.bind(this);
        this.onRemoveAdmin = this.onRemoveAdmin.bind(this);
        this.onChangeAdminPassword = this.onChangeAdminPassword.bind(this);
        this.onAddPromoCode = this.onAddPromoCode.bind(this);
        this.onRemovePromoCode = this.onRemovePromoCode.bind(this);
        this.onChangePromoCode = this.onChangePromoCode.bind(this);
        this.onAddDriver = this.onAddDriver.bind(this);
        this.onRemoveDriver = this.onRemoveDriver.bind(this);
        this.onUpdateCredit = this.onUpdateCredit.bind(this);
        this.send = this.send.bind(this);


    }

    onAddAdmin (inputs)
    {
        const url = this.props.baseUrl + '/admin/add';
        const body = {email: inputs[0].input, password: inputs[1].input, adder: this.props.profile.email};
        const onSuccess = () => {console.log("Admin Added")};
        const onFalure = () => {console.log("Failed to add Admin")};
        this.send(url, body, 'POST', onSuccess, onFalure);
    }

    onRemoveAdmin(inputs) {
        const url = this.props.baseUrl + '/admin/remove';
        const body = {email: inputs[0].input};
        const onSuccess = () => {console.log("Admin Removed!")};
        const onFalure = () => {console.log("Failed to remove Admin!")};
        this.send(url, body, 'DELETE', onSuccess, onFalure);
    }

    onChangeAdminPassword(inputs) {
        const url = this.props.baseUrl + '/admin/modify';
        const body = {email: inputs[0].input, password: inputs[1].input };
        const onSuccess = () => {console.log("Admin's Password Changed!")};
        const onFalure = () => {console.log("Failed to Change Admin's Password!")};
        this.send(url, body, 'PUT', onSuccess, onFalure);
    }

    onAddDriver(inputs) {
        const url = this.props.baseUrl + '/driver/add';
        const body = {email: inputs[0].input, password: inputs[1].input };
        const onSuccess = () => {console.log("Driver Added")};
        const onFalure = () => {console.log("Failed to add Driver")};
        this.send(url, body, 'POST', onSuccess, onFalure);
    }

    onRemoveDriver(inputs) {
        const url = this.props.baseUrl + '/driver/remove';
        const body = {email: inputs[0].input};
        const onSuccess = () => {console.log("Driver Removed!")};
        const onFalure = () => {console.log("Failed to remove Driver!")};
        this.send(url, body, 'DELETE', onSuccess, onFalure);
    }

    onUpdateCredit(inputs) {
        const url = this.props.baseUrl + '/credits/modify';
        const body = {email: inputs[0].input, amount: inputs[1].input };
        const onSuccess = () => {console.log("User's Credit Changed!")};
        const onFalure = () => {console.log("Failed to Change User's Credit!")};
        this.send(url, body, 'PUT', onSuccess, onFalure);
    }

    onAddPromoCode(inputs) {
        const url = this.props.baseUrl + '/promoCode/add';
        const body = {code: inputs[0].input, amount: inputs[1].input };
        const onSuccess = () => {console.log("Promo Added")};
        const onFalure = () => {console.log("Failed to add Promo code")};
        this.send(url, body, 'POST', onSuccess, onFalure);
    }


    onRemovePromoCode(inputs) {
        const url = this.props.baseUrl + '/promoCode/remove';
        const body = {code: inputs[0].input};
        const onSuccess = () => {console.log("Promo Removed!")};
        const onFalure = () => {console.log("Failed to remove Promo code!")};
        this.send(url, body, 'DELETE', onSuccess, onFalure);
    }

    onChangePromoCode(inputs) {
        const url = this.props.baseUrl + '/promoCode/modify';
        const body = {code: inputs[0].input, amount: inputs[1].input };
        const onSuccess = () => {console.log("Promo Changed!")};
        const onFalure = () => {console.log("Failed to Change Promo code!")};
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
                                btnColor="primary"  btnTxt="Add"  onClickingbutton = {this.onAddAdmin}/>


                        {/* Delete Admin*/}
                        <MyForm heading="Remove Admin" formGroups={[
                            {id:"formBasicEmail2", label: "Email address", type: "email", placeHolder: "Enter email"}]}
                                btnColor="danger" btnTxt="Remove" onClickingbutton={this.onRemoveAdmin}/>

                        {/* Change Admin Password*/}
                        <MyForm heading="Change Admin Password" formGroups={[
                            {id:"formBasicEmail3", label: "Email address", type: "email", placeHolder: "Enter email"},
                            {id:"formBasicPassword3", label: "Password", type: "password", placeHolder: "New Password"}]}
                                btnColor="success" btnTxt="Change" onClickingbutton={this.onChangeAdminPassword}/>

                        {/* Add Driver*/}
                        <MyForm heading="Add Driver" formGroups={[
                            {id:"formBasicEmail4", label: "Email address", type: "email", placeHolder: "Enter email"},
                            {id:"formBasicPassword4", label: "Password", type: "password", placeHolder: "Password"}]}
                                btnColor="primary" btnTxt="Add" onClickingbutton={this.onAddDriver}/>

                        {/* Delete Driver*/}
                        <MyForm heading="Remove Driver" formGroups={[
                            {id:"formBasicEmail5", label: "Email address", type: "email", placeHolder: "Enter email"}]}
                                btnColor="danger" btnTxt="Remove" onClickingbutton={this.onRemoveDriver}/>

                        {/* Add Credit to Rider/Driver*/}
                        <MyForm heading="Add Credit to Rider/Driver" formGroups={[
                            {id:"formBasicEmail6", label: "Email address", type: "email", placeHolder: "Enter email"},
                            {id:"formBasicPassword6", label: "Amount", type: "number", placeHolder: "Amount"}]}
                                btnColor="primary" btnTxt="Add" onClickingbutton={this.onUpdateCredit}/>

                        {/* Add PromoCode */}
                        <MyForm heading="Add PromoCode" formGroups={[
                            {id:"formBasicEmail7", label: "Code", type: "text", placeHolder: "Enter Code"},
                            {id:"formBasicPassword7", label: "Amount", type: "number", placeHolder: "Amount"}]}
                                btnColor="primary" btnTxt="Add"  onClickingbutton={this.onAddPromoCode}/>

                        {/* Remove PromoCode */}
                        <MyForm heading="Remove PromoCode" formGroups={[
                            {id:"formBasicEmail8", label: "Code", type: "text", placeHolder: "Enter Code"}]}
                                btnColor="danger" btnTxt="Remove" onClickingbutton={this.onRemovePromoCode}/>

                        {/* Change PromoCode */}
                        <MyForm heading="Change PromoCode" formGroups={[
                            {id:"formBasicEmail9", label: "Code", type: "text", placeHolder: "Enter Code"},
                            {id:"formBasicPassword9", label: "New Amount", type: "number", placeHolder: "Amount"}]}
                                btnColor="success" btnTxt="Add" onClickingbutton={this.onChangePromoCode}/>
                    </Paper>
                </div>

            </div>
        );
    }

}

