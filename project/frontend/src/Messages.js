import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact';
import './General.css';
import Cookies from 'js-cookie'
import axios from 'axios';
import * as moment from 'moment'


export default class Messages extends React.Component {
    constructor(props) {
        super(props);
        axios.get('http://18.184.207.248/api/chat/', { withCredentials: true })
            .then(res => {
                console.log(res.data.history);
                this.setState({ last_messages: res.data.history });
            })
        this.state = {
            last_messages: [],
            chat_messages: []
        }

    }

    messageField() {
        var messages = [];
        //console.log(this.state.last_messages);
        //console.log(this.state.last_messages[0])
        for (let i = 0; i < this.state.last_messages.length; i++) {
            messages[this.state.last_messages.length - i] = (
                <div className="Messagebox" onClick={this.openmessages.bind(this, this.state.last_messages[i].username)}>
                    <p className="left_aligned">
                        <b>{this.state.last_messages[i].username}</b>
                        <span className="right_float">
                            {moment(this.state.last_messages[i].last_message_date).format('MMM Do YY')}
                        </span>
                    </p>
                    <p>{this.state.last_messages[i].last_message}</p>
                </div>
            );
        }
        return messages;
    }
    openmessages(usr) {
        //console.log(usr)
        axios.get('http://18.184.207.248/api/chat/' + usr, { withCredentials: true })
            .then(res => {
                //console.log(res.data);
                this.setState({ chat_messages: res.data })
            })


    }

    fillChatWindow() {
        var chat = [];
        for (let i = 0; i < this.state.chat_messages.length; i++) {
            //console.log(this.state.chat_messages[i].from_username)
            if (this.state.chat_messages[i].from_username === Cookies.get('username')) {
                chat[i] = (
                    <div className="chat_message_right Messagebox " >
                        <p>{this.state.chat_messages[i].message}
                            <span className="right_float">
                                {moment(this.state.chat_messages[i].createdAt).format('MMM Do YY, h:mm:ss a')}
                            </span>
                        </p>
                    </div>
                );
            } else {
                chat[i] = (
                    <div className="chat_message_left Messagebox ">
                        <p>{this.state.chat_messages[i].message}
                            <span className="right_float">
                                {moment(this.state.chat_messages[i].createdAt).format('MMM Do YY, h:mm:ss a')}
                            </span>
                        </p>
                    </div>
                );
            }
        }
        return chat;
    }
    sendmessage() { }


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
                '<li id="chld" style="float:right";><a href="/Logout">Logout</a></li>' +
                '<li id="chld" style="float:right";><a href="/Settings" >Settings</a></li>');
        }
    }

    render() {
        //console.log(this.state.chat_messages)
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
                            <div className="messagehistory Scrollbar">
                                {this.fillChatWindow()}
                            </div>
                        </MDBRow>
                        <MDBRow>
                            <textarea
                                type="text"
                                className="form-control top-margined-20"
                                rows="2"
                            />
                            <div className="mt-4">
                                <MDBBtn color="orange" onClick={this.sendmessage.bind(this)} type="submit">
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
