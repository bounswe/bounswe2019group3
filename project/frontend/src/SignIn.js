import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import './SignUp.css';
import { Redirect, NavLink, withRouter } from 'react-router-dom';


import axios from 'axios';


export default class FormPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    }
  }


  onClickd() {
    const frm = {
      id: document.getElementById("usr").value,
      password: document.getElementById("pass").value,

    };
    console.log(JSON.stringify(frm));
    var responseStatus;
    axios.post('http://ec2-52-59-191-167.eu-central-1.compute.amazonaws.com/api/auth/login', frm)
      .then(res => {
        console.log(res);
        responseStatus = res;
        console.log(responseStatus);
        if (responseStatus.status == 200) {
          console.log(this);
          this.setState({ authenticated: true });
        }

      })

  };

  render() {
    console.log(this.state.authenticated);
    if (this.state.authenticated) {
      return (<Redirect
        to={{
          pathname: "/profile",
          state : { 
            username :  document.getElementById("usr").value 
          }
        }}
      />);
    }

    return (

      <MDBContainer fluid>

        <MDBRow className="topMargined50">
          <MDBCol md="1"></MDBCol>
          <MDBCol md="7">
            <img src=".\earth3.png" alt="." width="100%" />
          </MDBCol>
          <MDBCol className="margined" md="4">


            <form>
              <p className="text text-center mb-4">LOGIN</p>
              <div className="white-text">
                <MDBInput
                  id="usr"
                  label="Username"
                  icon="user"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"

                />

                <MDBInput
                  id="pass"
                  label="Password"
                  icon="lock"
                  group
                  type="password"
                  validate
                />

              </div>
              <table>
                <tr>
                  <td >
                    <MDBBtn color="orange" onClick={this.onClickd.bind(this)} className="text2"> LOGIN</MDBBtn>
                  </td>
                  <td>
                    Not a member? <br />
                    <NavLink to="/signup">
                      Sign Up
                        </NavLink>
                  </td>

                </tr>
              </table>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
