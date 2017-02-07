import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { Nav, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as userActions from '../actions/UserActions';

class App extends Component {
    render() {
        const { user } = this.props;
        return (
            <div className='container'>
                <Nav bsStyle='pills'>
                    <NavItem ><Link to='/home'>Home</Link></NavItem>
                    {!user.username && <NavItem ><Link to='/auth'>Authorization</Link></NavItem>}
                    {user.username && <NavItem ><Link to='/about'>AboutAuthor</Link></NavItem>}
                    {user.username && <NavItem ><Link to='/map'>Map</Link></NavItem>}
                    {user.username && <NavItem onClick={this.logOut}>Log out</NavItem>}
                </Nav>
                {this.props.children}
            </div>
        )
    }

    logOut = () => {
        this.props.userActions.logOut();
    }
}

function mapStateToProps (state) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);