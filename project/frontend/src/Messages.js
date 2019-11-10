import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput,MDBIcon } from 'mdbreact';
import './SignUp.css';
import { Redirect, NavLink } from 'react-router-dom';
import Cookies from 'js-cookie'
import axios from 'axios';


export default class Messages extends React.Component {
    constructor(props) {
        super(props);
        
      
        /* axios.get('http://18.184.207.248/api/chat/')
          .then(res => {
            console.log(res.data);
            this.setState({ information: res.data });
          }) */
    
        this.state = {
          
          information: {
            "nb_new_messages": 3,
            "history": [
               {
                   "username": "user",
                   "last_message": "hello world",
                   "nb_new_messages": 1,
                   "last_message_date": "2013-10-21T13:28:06.419Z"
               },
               {
                   "username": "admin",
                   "last_message": "welcome to bulingo",
                   "nb_new_messages": 2,
                   "last_message_date": "2013-10-20T11:10:04.222Z"
               }    
            ]
          },
          
        }
      }
    messageField(){
        var messages = [];
        for (let i = 0; i < this.state.information.history.length; i++) {
            messages[this.state.information.history.length - i] = (
            <div className="Messagebox" onClick={this.openmessages.bind(this)}>          
            <p>{this.state.information.history[i].username}</p>
            <p>{this.state.information.history[i].last_message}</p>
            </div>
        );
        }
        return messages;
    }
    messagehistorywindow(user){}
    sendmessage(){}
    openmessages(){
        console.log("im_clicked")
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
            '<li id="chld"><a href="/messages">Messages</a></li>' +
            '<li id="chld" style="float:right";><a href="/Logout">Logout</a></li>'+
            '<li id="chld" style="float:right";><a href="/Settings" >Settings</a></li>');
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
        return (
            <MDBContainer fluid>
                <MDBRow className="topMargined">
                    <center><img className="backpicture" src=".\earth3.png" alt="." width="80%" /></center>
                    <MDBCol md="3">
                        <div className="Scrollbar">
                            {this.messageField()}
                        </div>
                    </MDBCol>
                    <MDBCol md="7">
                       <MDBRow>
                           <div className = "messagehistory Scrollbar"></div>
                       </MDBRow>
                       <MDBRow>
                       
                       <textarea
                type="text"
                className="form-control top-margined-20"
                rows="2"
              />
              <div className="mt-4">
                <MDBBtn color="orange" onClick={this.sendmessage.bind(this)} background type="submit">
                  SEND
                <MDBIcon far icon="paper-plane" className="ml-2" />
                </MDBBtn>
              </div>
                       </MDBRow>
                       <MDBRow></MDBRow>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}
