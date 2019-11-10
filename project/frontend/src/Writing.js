import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdbreact';
import './SignUp.css';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'

export default class ExaminationPage extends React.Component {
  constructor(props) {
    super(props);
    /* axios.get('http://18.184.207.248/api/', {withCredentials: true})
        .then(res => {
            
        }) */
    this.state = {
      isSended: false,
      isLogout: false
    }
  }
  onClickd() { 
    this.setState({
      isSended: true
    });
  }


  componentDidMount() {
    var _navbar = document.getElementById("nav");
    if (_navbar.childNodes.length > 2) {
      return;
    } else {
      _navbar.removeChild(_navbar.childNodes[0]);
      var _nav = document.getElementById("last_item");
      _nav.insertAdjacentHTML('beforebegin',
        '<li id="chld"><a href="/profile">Profile</a></li>');
      _nav.insertAdjacentHTML('afterend',
        '<li id="chld"><a href="/exam">Exam</a></li>' +
        '<li id="chld"><a href="/writing">Send Writing</a></li>' +
        '<li id="chld" style="float:right";><a href="/Logout">Logout</a></li>' +
        '<li id="chld" style="float:right";><a >Settings</a></li>');
    }
  }

  render() {
    if (this.state.isLogout) {
      return (<Redirect
        push to={{
          pathname: "/"
        }}
      />);
    }

    if(this.state.isSended) {
      return (<Redirect
        push to={{
          pathname: "/profile"
        }}
      />);
    }

    return (
      <MDBContainer fluid>

        <MDBRow className="topMargined">
          <center><img className="backpicture" src=".\earth3.png" alt="." width="80%" /></center>
          <MDBCol md="2"></MDBCol>
          <MDBCol md="8">
            <form>


              <label
                className="grey-text"
              >
                Title
            </label>
              <input
                type="text"
                className="form-control"
              />
              <br />
              <label
                className="grey-text"
              >
                Your Writing
            </label>
              <textarea
                type="text"
                className="form-control"
                rows="10"
              /><br />
              <label
                className="grey-text"
              >
                Send To
            </label>
              <input
                type="text"
                className="form-control"
              />
              <div className="mt-4">
                <MDBBtn color="orange" onClick={this.onClickd.bind(this)} background type="submit">
                  SEND
                <MDBIcon far icon="paper-plane" className="ml-2" />
                </MDBBtn>
              </div>
            </form>
          </MDBCol>
          <MDBCol md="2"></MDBCol>

        </MDBRow>
      </MDBContainer>
    );
  }
}
