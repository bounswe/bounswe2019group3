import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBBtn, MDBCardHeader, MDBIcon } from 'mdbreact';
import './General.css';
import { Radar } from 'react-chartjs-2';
import Cookies from 'js-cookie'
import axios from "axios";
import StarRatingComponent from 'react-star-rating-component';
import * as moment from 'moment';
import { Redirect, NavLink } from 'react-router-dom';

var username_;
export default class Messages extends React.Component {

    constructor(props) {
        super(props);
        //console.log(this.props)
        username_ = this.props.location.data_;
        //console.log(this.props.location.data_)
        axios.get(('http://18.184.207.248/api/user/' + username_), { withCredentials: true })
            .then(res => {
                //console.log(res.data);
                this.setState({ information: res.data });
            })
        axios.get('http://18.184.207.248/api/user/' + username_ + '/comments', { withCredentials: true })
            .then(res => {
                //console.log(res.data);
                this.setState({ comments: res.data });
            })
        axios.get('http://18.184.207.248/api/user/' + username_ + '/language/level', { withCredentials: true })
            .then(res => {
                //console.log(res.data);
                this.setState({ languages: res.data });
            })

        this.state = {
            _data: "",
            is_comment_send: false,
            returnToMessages: false,
            username: "",
            comments: [],
            languages: [],
            information: [],
            exercises: false,
            writing: false,
            rating: 4 ,
            dataRadar: {
                labels: ["Listening", "Reading", "Writing", "Vocabulary", "Grammar"],
                datasets: [
                    {
                        label: "english",
                        backgroundColor: "rgba(245, 74, 85, 0.5)",
                        data: [3.25, 7, 6, 5, 5]
                    },
                    {
                        label: "german",
                        backgroundColor: "rgba(90, 173, 246, 0.5)",
                        data: [2.7, 4, 4.3, 7, 4]
                    }
                ]
            }
        }
    }
    commentField() {
        var comm = [];
        for (let i = 0; i < this.state.comments.length; i++) {
            comm[i] = (
                <div className="Comment">
                    <p className="commentsec_title">{this.state.comments[i].comment_by}</p>
                    <p>{this.state.comments[i].text}</p>
                    <p className="commentsec_usrname rightaligned small">{moment(this.state.comments[i].createdAt).format('MMM Do YY, h:mm:ss a')}</p>
                </div>
            );
        }
        return comm;
    }

    languagesWithLevels() {
        var lan = [];
        for (let i = 0; i < this.state.languages.length; i++) {
            lan[i] = (
                <MDBCol md="4" className="topMargined commentsec_usrname">
                    <div >
                        <p > {this.state.languages[i].lang_abbr} -> {this.state.languages[i].grade}  </p>
                    </div>
                </MDBCol>
            );
        }
        return lan;
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
            '<li id="chld"><a href="/exam">Exam</a></li>' +
            '<li id="chld"><a href="/writingsList">My Writings</a></li>'+
            '<li id="chld"><a href="/writing">Send Writing</a></li>' +
            '<li id="chld"><a href="/messages">Messages</a></li>' +
            '<li id="chld" style="float:right";><a href="/Logout">Logout</a></li>' +
            '<li id="chld" style="float:right";><a href="/Settings" >Settings</a></li>' +
            '<li id="chld" style="float:right";><a href="/Search" >Search</a></li>');
    }
    onStarClick(nextValue, prevValue, name) {
        /* axios.post(( "" + nextValue, { withCredentials: true })
        .then(res => {}); */
        this.setState({ rating: nextValue });
    }
    sendcomment() {
        const cmmnt = {
            text: document.getElementById("comment_to_send").value,
            rating : this.state.rating
        }

        axios.post(('http://18.184.207.248/api/user/' + username_ +'/comments'), cmmnt, { withCredentials: true })
            .then(res => {
                document.getElementById("comment_to_send").value = "";
                cmmnt.comment_by = Cookies.get('username');
                cmmnt.createdAt = new Date();
                let comments = this.state.comments;
                comments.push(cmmnt);
                this.setState({ comments:comments })
            });

        console.log(cmmnt)
    }
    sendmessage() {

        const msg = {
            message: document.getElementById("message_to_send").value

        }
        axios.post(('http://18.184.207.248/api/chat/' + username_), msg, { withCredentials: true })
            .then(res => {
                this.setState({ returnToMessages: true })
            });

    }

    render() {
        
        if(this.state.is_comment_send){
            return (<Redirect
                to={{
                    pathname: "/user", 
                    data_: username_         
                }}
              />);
        }
        if (this.state.returnToMessages) {
            return (<Redirect
                push to={{
                    pathname: "/messages",
                    state: {
                        last_messages: [],
                        chat_messages: []
                    }
                }}
            />);
        }
        return (
            <MDBContainer fluid>
                <MDBRow>
                    <center><img className="backpicture" src=".\earth3.png" alt="." width="80%" /></center>
                    <MDBCol md="4">
                        <div className="fixedsizebio">
                            <div className="marginedleft20">
                                <MDBRow>
                                    <MDBCol md="6">
                                        <MDBRow>
                                            <MDBCol>
                                                <div > <p className="commentsec_usrname topMargined" >{this.state.information.username}</p> </div>
                                                <StarRatingComponent
                                                    editing={true}
                                                    starCount={5}
                                                    value={this.state.rating}//this.state.information.rating
                                                    size="50px"
                                                    onStarClick={this.onStarClick.bind(this)}
                                                />
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBCol>
                                    <MDBCol md="6">
                                        <img className="profilePic topMargined marginedleft50" src={this.state.information.avatar} alt="." />
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol>
                                        <MDBRow>
                                            {this.languagesWithLevels()}

                                        </MDBRow>
                                        <MDBRow>
                                            <div className="Bio"><p className="commentsec_usrname">My Biography</p>
                                                {this.state.information.bio}
                                                <p>
                                                    {this.state.temp}
                                                    {this.state.returnToMessages}</p>
                                            </div>
                                            <div > <p className=" topMargined marginedleft" >
                                                <MDBIcon icon="envelope" className="mr-3" />
                                                {this.state.information.email}</p> </div>
                                        </MDBRow>
                                    </MDBCol>
                                </MDBRow>
                            </div>
                        </div>
                    </MDBCol>
                    <MDBCol md="4">
                        <div className="Scrollbar" style={{ height: 52 + 'vh' }}>
                            {this.commentField()}
                        </div>
                        <form>
                            <textarea
                                type="text"
                                className="form-control topMargined"
                                rows="3"
                                id="comment_to_send"
                            />
                            <div className="" >
                                <MDBBtn color="orange" onClick={this.sendcomment.bind(this)} >
                                    SEND COMMENT
                                    <MDBIcon far icon="paper-plane" className="ml-2" />
                                </MDBBtn>
                            </div>
                        </form>
                    </MDBCol>
                    <MDBCol md="4">
                        <MDBCard className="mb-5 ">
                            <MDBCardHeader>Language levels</MDBCardHeader>
                            <MDBCardBody>
                                <Radar data={this.state.dataRadar} options={{ responsive: true }} /></MDBCardBody>
                        </MDBCard>

                        <textarea
                            type="text"
                            className="form-control topMargined"
                            rows="6"
                            id="message_to_send"
                        />
                        <div className="" >
                            <MDBBtn color="orange" onClick={this.sendmessage.bind(this)}  type="submit">
                                SEND MESSAGE
                                    <MDBIcon far icon="envelope" className="ml-2" />
                            </MDBBtn>
                        </div>

                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}