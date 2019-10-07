import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import './SignUp.css';
import { NavLink } from 'react-router-dom';

import axios from 'axios';

var usrname;
var pass;
var mail;

function onClickd() {
  const frm = {
    username: document.getElementById("usr").value,
    password: document.getElementById("pass").value,
    email: document.getElementById("mail").value
  };
  console.log(JSON.stringify(frm));
  axios.post('http://ec2-52-59-191-167.eu-central-1.compute.amazonaws.com/api/auth/signup',  frm )
      .then(res => {
        console.log(res);
        console.log(res.data);
      })

};

export default class FormPage extends React.Component {
  render() {
    return (
      <MDBContainer fluid>
        
        <MDBRow className = "topMargined50">
        <MDBCol md="1"></MDBCol>
          <MDBCol md="7">
            <img src=".\earth3.png" alt="." width="100%" />
          </MDBCol>
          <MDBCol className="margined" md="4">


            <form>
              <p className="text text-center mb-4">SIGN UP</p>
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
                  id="mail"
                  label="Email"
                  icon="envelope"
                  group
                  type="email"
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
                    <MDBBtn color="orange" onClick={onClickd} className="text2"> Register</MDBBtn>
                  </td>
                  <td>
                    Already a member? <br />
                    <NavLink to="/signin">
                      Sign In
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
