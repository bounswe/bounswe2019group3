import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import './SignUp.css';


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
  render() {
    return (

      <MDBContainer fluid>
        <MDBRow className="header"><img src=".\header.png" alt="." width="100%" /></MDBRow>
        <MDBRow>
          <MDBCol md="8">
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
                    <MDBBtn color="orange" onClick={onClickd} className="text2"> Sign In</MDBBtn>
                  </td>
                  <td>
                    Not a member? <br />
                    <a ><h8>Go to sign up</h8></a>
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
