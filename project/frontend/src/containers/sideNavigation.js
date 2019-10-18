import React from 'react';
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import '../SignUp.css';
import { NavLink } from 'react-router-dom';

const TopNavigation = () => {
    return (
        <div className="sidebar-fixed position-fixed mx-md-m6 topMarginedSidebar1">
            <a href="#!" className="logo-wrapper waves-effect">
               
            </a>
            <MDBListGroup className="list-group-flush">
                <NavLink exact={true} to="/" activeClassName="activeClass">
                    <MDBListGroupItem className="list-group-item-light">
                        <MDBIcon icon="home" className="mr-3"/>
                        Home
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/SignUp" activeClassName="activeClass">
                    <MDBListGroupItem className="list-group-item-light">
                        <MDBIcon icon="thumbs-up" className="mr-3"/>
                        SignUp
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/SignIn" activeClassName="activeClass">
                    <MDBListGroupItem className="list-group-item-light">
                        <MDBIcon icon="check-circle" className="mr-3"/>
                        Login
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/exam" activeClassName="activeClass">
                    <MDBListGroupItem className="list-group-item-light">
                        <MDBIcon icon="clipboard-check" className="mr-3"/>
                        Examination Page
                    </MDBListGroupItem>
                </NavLink>
                
            </MDBListGroup>
        </div>
    );
}

export default TopNavigation;