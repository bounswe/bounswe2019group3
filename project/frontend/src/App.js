import React, { Component } from 'react';
import Routes from './Routes';
import './SignUp.css';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import SideNavigation from "./containers/sideNavigation";
import Nav from './containers/nav'


class App extends Component {


  render() {
    return (
      <MDBContainer fluid>
        <MDBRow className="header-padding">
          <div>
            <header className="header"   >
              <img src=".\header2.png" alt="." width=" 100% " height="150px" />
            </header>
          </div>
        </MDBRow>
        <MDBRow>
          <Nav />
        </MDBRow>
        
        <MDBRow className="flexible-content">
          <MDBCol>
            <main id="content" className="p-5">
              <Routes />
            </main>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default App;
