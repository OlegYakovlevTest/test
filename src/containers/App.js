import React, { Component } from 'react';
import { Link } from 'react-router';
import { Nav, NavItem } from 'react-bootstrap';

export default class App extends Component {
    render() {
        return (
            <div className='container'>
                <Nav bsStyle='pills'>
                    <NavItem ><Link to='/home'>Home</Link></NavItem>
                    <NavItem ><Link to='/about'>AboutAuthor</Link></NavItem>
                    <NavItem ><Link to='/auth'>Authorization</Link></NavItem>
                    <NavItem ><Link to='/map'>Map</Link></NavItem>
                </Nav>
                {this.props.children}
            </div>
        )
    }
}