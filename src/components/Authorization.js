import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Button, Col, ControlLabel, PageHeader } from 'react-bootstrap';
import { connect } from 'react-redux';
import { signIn, signUp } from '../actions/UserActions';

@connect(state => ({
    user: state.user
}), {signIn, signUp})

export default class Authorization extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isBtnDisabled: true
        };
        this.login = '';
        this.password = '';
    }

    render() {
        return (
            <Form horizontal>
                <PageHeader>Authorization page</PageHeader>
                <FormGroup controlId='formHorizontalEmail'>
                    <Col componentClass={ControlLabel} sm={2}>
                        Email
                    </Col>
                    <Col sm={10}>
                        <FormControl type='email' placeholder='Email' onChange={this.onLoginChange}/>
                    </Col>
                </FormGroup>

                <FormGroup controlId='formHorizontalPassword'>
                    <Col componentClass={ControlLabel} sm={2}>
                        Password
                    </Col>
                    <Col sm={10}>
                        <FormControl type='password' placeholder='Password' onChange={this.onPasswordChange}/>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button type='button' onClick={this.signIn} disabled={this.state.isBtnDisabled}>
                            Sign in
                        </Button>
                        <Button type='button' onClick={this.signUp} disabled={this.state.isBtnDisabled}>
                            Sign up
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }

    onLoginChange = (event) => {
        this.login = event.target.value;
        this.validate();
    }

    onPasswordChange = (event) => {
        this.password = event.target.value;
        this.validate();
    }

    validate = () => {
        if (this.state.isBtnDisabled && this.login.length > 3 && this.password.length > 3) {
            this.setState({isBtnDisabled: false});
        } else if (!this.state.isBtnDisabled && (this.login.length <= 3 || this.password.length <= 3)) {
            this.setState({isBtnDisabled: false});
        }
    }

    signIn = () => {
        console.log(this.props);
        const data = {
            username: this.login,
            password: this.password
        };
        this.props.signIn(data);
    }

    signUp = () => {
        const data = {
            username: this.login,
            password: this.password
        };
        this.props.signUp(data);
    }
}