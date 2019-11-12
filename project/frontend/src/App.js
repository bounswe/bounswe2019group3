import React, { Component } from 'react';
import Routes from './Routes';
import './General.css';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import Cookies from 'js-cookie';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogined: Cookies.get('username')
    };
  }

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
        <MDBRow id="navbar">
          <ul id="nav">
            <li id="home"><a href="/">Home</a></li>
            <li id="last_item"><a href="#">Exercise</a></li>
          </ul>
        </MDBRow>
        <MDBRow >
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
