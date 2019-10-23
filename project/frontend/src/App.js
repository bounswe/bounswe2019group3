import React, { Component } from 'react';
import Routes from './Routes';
import './SignUp.css';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import Nav from 'react-bootstrap/Nav'
import Cookies from 'js-cookie'


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
        <MDBRow>

          {this.state.isLogined ? (
            <Nav activeKey="/home">
            <Nav.Item>
              <Nav.Link href="/home">a</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/exam">Exam</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-2">Link</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="disabled" disabled>
                Disabled
          </Nav.Link>
            </Nav.Item>
          </Nav>
          ) : (
            <Nav activeKey="/home">
            <Nav.Item>
              <Nav.Link href="/home">a</Nav.Link>
            </Nav.Item>
            
            <Nav.Item>
              <Nav.Link eventKey="disabled" disabled>
                Disabled
          </Nav.Link>
            </Nav.Item>
          </Nav>
            )}

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
