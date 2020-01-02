import React from "react";
import { MDBRow, MDBCol, MDBBtn } from "mdbreact";
import './General.css';
import Cookies from 'js-cookie';
import axios from "axios";
import { Redirect } from 'react-router-dom';
class FormsPage extends React.Component {
  constructor(props) {
    super(props);
    axios.get(('http://localhost:3000/api/user/' + Cookies.get('username')), { withCredentials: true })
      .then(res => {
        //console.log(res.data);
        this.setState({ information: res.data });
      })
      

    this.state = {
      information: [],
      bio: "",
      avatar: undefined,
      changed: false
    };
    this.handleAvatarChange = this.handleAvatarChange.bind(this);
  }

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  async sendFormData() {
    
    const frm = {
      bio: document.getElementById("bio").value,
      
    };
    // Send avatar if exists
    if(this.state.avatar) {
      const data = new FormData();
      data.append("avatar", this.state.avatar, "wow");
      
      const res = await axios.post(('http://localhost:3000/api/user/' + Cookies.get('username')),
            data,
            { withCredentials: true, headers: {
              "Content-Type" : "multipart/form-data"
            } });
            alert("changed successfully");
            this.setState({changed: true});
    }
    // send bio
    console.log(JSON.stringify(frm));
    var responseStatus;
    const response = await axios.post(('http://localhost:3000/api/user/' + Cookies.get('username')),frm, { withCredentials: true })
      .then(res => {
     
        responseStatus = res;
  
      })
    
  }

  onClickd(){
    console.log("wow");
    this.sendFormData().then(_ => {
      this.setState({changed: true});
      alert("changed successfully");
      console.log("wow");
 
    }).catch(err => {
      console.log(err);
    
    });


  }
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
    '<li id="chld"><a href="/sendexercise">Send Exercise</a></li>'+
      '<li id="chld"><a href="/exam">Exam</a></li>' +
      '<li id="chld"><a href="/writingsList">My Writings</a></li>'+
      '<li id="chld"><a href="/writing">Send Writing</a></li>' +
      '<li id="chld"><a href="/messages">Messages</a></li>' +
      '<li id="chld" style="float:right";><a href="/Logout">Logout</a></li>' +
      '<li id="chld" style="float:right";><a href="/Settings">Settings</a></li>' +
      '<li id="chld" style="float:right";><a href="/Search" >Search</a></li>');
  }

  handleAvatarChange(ev) {
    this.setState({
        avatar: ev.target.files[0]
    });
  }

  render() {
    if (this.state.changed) {
      return (<Redirect
        push to="profile"
      />);
    }

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
              onChange={this.handleAvatarChange}
              id="file"
              
            />
            <label
              className="custom-file-label"
              htmlFor="validatedCustomFile"
            >
              Choose picture...
          </label>

          </div>
        </form>
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
                placeholder={this.state.information.bio}
              />
            </MDBCol>
          </MDBRow>
        </div>

        <MDBBtn color="orange" onClick={this.onClickd.bind(this)}>
          Change
        </MDBBtn>
      </div>


    );
  }
}

export default FormsPage;