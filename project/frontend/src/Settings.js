import React from "react";
import { MDBRow, MDBCol, MDBBtn } from "mdbreact";
import './General.css';
import Cookies from 'js-cookie';
import axios from "axios";
class FormsPage extends React.Component {
  constructor(props) {
    super(props);
    axios.get(('http://18.184.207.248/api/user/' + Cookies.get('username')), { withCredentials: true })
      .then(res => {
        //console.log(res.data);
        this.setState({ information: res.data });
      })

    this.state = {
      information: [],
      userName: "",
      email: "",
      bio: ""

    };
  }

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  componentDidMount() {
    var _navbar = document.getElementById("nav");
    if (_navbar.childNodes.length > 2) {
      return;
    }
    _navbar.removeChild(_navbar.childNodes[0]);
    var _nav = document.getElementById("last_item");
    _nav.insertAdjacentHTML('beforebegin',
      '<li id="chld"><a href="/profile">Profile</a></li>');
    _nav.insertAdjacentHTML('afterend',
      '<li id="chld"><a href="/exam">Exam</a></li>' +
      '<li id="chld"><a href="/writing">Send Writing</a></li>' +
      '<li id="chld"><a href="/messages">Messages</a></li>' +
      '<li id="chld" style="float:right";><a href="/Logout">Logout</a></li>' +
      '<li id="chld" style="float:right";><a href="/Settings">Settings</a></li>');
  }

  render() {
    return (

      <div className="centered">
        <form >
          <div className="custom-control custom-radio">
            <input
              type="radio"
              className="custom-control-input"
              id="customControlValidation2"
              name="radio-stacked"
              required
            />
            <label
              className="custom-control-label"
              htmlFor="customControlValidation2"
            >
              Accept writing
          </label>
          </div>
          <div className="custom-control custom-radio mb-3">
            <input
              type="radio"
              className="custom-control-input"
              id="customControlValidation3"
              name="radio-stacked"
              required
            />
            <label
              className="custom-control-label"
              htmlFor="customControlValidation3"
            >
              Do not accept writing
          </label>

          </div>

          <label
            htmlFor="defaultFormRegisterNameEx"
            className="grey-text"
          >
            Change Picture
              </label>

          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="validatedCustomFile"
              required
            />
            <label
              className="custom-file-label"
              htmlFor="validatedCustomFile"
            >
              Choose picture...
          </label>

          </div>
        </form>
        <form>
          <div>
            <MDBRow>
              <center><img className="backpicture" src=".\earth3.png" alt="." width="80%" /></center>
              <MDBCol md="4" className="mb-3">
                <label
                  htmlFor="defaultFormRegisterNameEx"
                  className="grey-text"
                >
                  Bio
              </label>
                <input
                  value={this.state.bio}
                  name="bio"
                  onChange={this.changeHandler}
                  type="text"
                  id="bio"
                  className="form-control"
                  placeholder="Bio"
                  required

                />
              </MDBCol>
            </MDBRow>
          </div>
          <MDBRow>
            <MDBCol md="4" className="mb-3">
              <label
                htmlFor="defaultFormRegisterNameEx"
                className="grey-text"
              >
                Username
              </label>
              <input
                value={this.state.userName}
                name="userName"
                onChange={this.changeHandler}
                type="text"
                id="userName"
                className="form-control"
                placeholder={this.state.information.username}
                required

              />
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol md="4" className="mb-3">
              <label
                htmlFor="defaultFormRegisterConfirmEx3"
                className="grey-text"
              >
                Email
              </label>
              <input
                value={this.state.email}
                onChange={this.changeHandler}
                type="email"
                id="email"
                className="form-control"
                name="email"
                placeholder={this.state.information.email}
              />
            </MDBCol>
          </MDBRow>
          <MDBBtn color="orange" type="submit">
            Change
          </MDBBtn>
        </form>
      </div>


    );
  }
}

export default FormsPage;