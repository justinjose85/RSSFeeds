// Layout.js
import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import './Layout.css'; // Import the CSS file

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <div className="layout-container"> {/* Apply the class to the container div */}
                <NavMenu />
                <Container tag="main">
                    {this.props.children}
                </Container>
            </div>
        );
    }
}
