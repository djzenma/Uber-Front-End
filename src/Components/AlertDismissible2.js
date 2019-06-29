import React from 'react';
import './../App.css';
import {Alert} from "react-bootstrap";


export class AlertDismissible2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
        };
    }

    render() {
        const handleDismiss = () => this.setState({ show: false });
        const handleShow = () => this.setState({ show: true });
        if (this.state.show) {
            return (
                <Alert variant="success" onClose={handleDismiss} dismissible>
                    You Can Now Accept Rides from {this.props.location} !
                </Alert>
            );
        }
        return "";
    }
}
