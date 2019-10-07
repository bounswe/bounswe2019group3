import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import './SignUp.css';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';


var usrname;
var pass;

function goToSignIn() {
  window.open(".containersSignIn");
}
function onClickd() {
  const frm = {
    usrname: document.getElementById("usr").value,
    pass: document.getElementById("pass").value,
    
  };
  console.log(JSON.stringify(frm));

};

export default class FormPage extends React.Component {
  constuctor() {
    this.routeChange = this.routeChange.bind(this);
  }

  routeChange() {
    let path = '/profile';
    this.props.history.push(path);
  }
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
                    <MDBBtn color="orange" onClick={this.routeChange} className="text2"> LOGIN</MDBBtn>
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
