import React from 'react';
import Cookies from 'js-cookie';
import Nav from 'react-bootstrap/Nav'

export default class MyNavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogedin: false
          }
        if(Cookies.get('username')){
            this.setState({ isLogedin: true });
        }
      }

    render() {
        if(this.state.isLogedin){
            return(
                <Nav activeKey="/home">
              <Nav.Item>
                <Nav.Link href="/home">Home</Nav.Link>
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
            )
        };

            return(
                <Nav activeKey="/home">
              <Nav.Item>
                <Nav.Link href="/nopermission">Home</Nav.Link>
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
            );
        
    }

}