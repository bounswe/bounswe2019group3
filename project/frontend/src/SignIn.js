import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import './General.css';
import { Redirect, NavLink } from 'react-router-dom';
import Cookies from 'js-cookie'
import axios from 'axios';


export default class FormPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    };
    if (Cookies.get('username')) {
      this.setState({ authenticated: true });
    }
  }


  onClickd() {
    const frm = {
      id: document.getElementById("usr").value,
      password: document.getElementById("pass").value,

    };
    //console.log(JSON.stringify(frm));
    var responseStatus;
    axios.post('http://18.184.207.248/api/auth/login', frm, { withCredentials: true })
      .then(res => {
        //applicationa (app.js) loginin başarılı olduğnu burda bildirmemiz gerekiyor.
        //propsdan bir fonsiyon alarak
        //console.log(res);
        responseStatus = res;
        //console.log(responseStatus);
        if (responseStatus.status === 200) {
          //console.log(this);
          Cookies.set('username', frm.id);
          //console.log(Cookies.get());
          this.setState({ authenticated: true });

        }

      })

  };

  render() {
    //console.log(this.state.authenticated);
    if (this.state.authenticated) {
      return (<Redirect
        push to={{
          pathname: "/profile",
          state: {
            username: document.getElementById("usr").value,
          }
        }}
      />);
    }

    return (
      <MDBContainer fluid>
        <MDBRow >
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
                <thead></thead>
                <tbody>
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
                </tbody>
              </table>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
