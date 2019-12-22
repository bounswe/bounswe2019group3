import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import './General.css';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'

var content;
export default class FormPage extends React.Component {
  constructor(props) {
    super(props);

    content = this.props.location._data;

  }
  
  fill_writing_table() {
    var row = [];
        row[0] = (
            <div className="ExamBox"> {content} </div>
        );
    return row;
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
        '<li id="chld"><a href="/writingsList">My Writings</a></li>'+
        '<li id="chld"><a href="/writing">Send Writing</a></li>' +
        '<li id="chld"><a href="/messages">Messages</a></li>' +
        '<li id="chld" style="float:right";><a href="/Logout">Logout</a></li>' +
        '<li id="chld" style="float:right";><a href="/Settings" >Settings</a></li>' +
        '<li id="chld" style="float:right";><a href="/Search" >Search</a></li>');
    }
  }

  render() {
   
    return (
      <MDBContainer fluid>
        <MDBRow className="topMargined">
          <center><img className="backpicture" src=".\earth3.png" alt="." width="80%" /></center>
          <MDBCol md="8">
            <div className="marginedleft20">
              <MDBRow>
                <MDBCol md="6">
                  <MDBRow>
                        {this.fill_writing_table()}
                  </MDBRow>
                </MDBCol>
              </MDBRow>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer >
    );
  }
}
