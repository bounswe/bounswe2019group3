import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import './General.css';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'


export default class ExaminationPage extends React.Component {
    constructor(props) {
        super(props);
        axios.get('http://18.184.207.248/api/language/', { withCredentials: true })
            .then(res => {
                this.setState({ languages: res.data });
            })
        this.state = {
            selectedLanguage: "",
            languages: [],
            isLogout: false
        }
    }


    languageButtons() {
        var lang = [];
        for (let i = 0; i < this.state.languages.length; i++) {
            lang[i] = (
                <MDBBtn
                    color="orange"
                    id={this.state.languages[i].abbr}
                    onClick={() => this.goToExam(this.state.languages[i].name, this.state.languages[i].abbr)}
                    className="text2 btn-block "
                >{this.state.languages[i].name} </MDBBtn>
            );
        }
        return lang;
    }

    goToExam(lang, abbr) {
        Cookies.set('selectedExamLanguage', lang);
        Cookies.set('selectedExamLanguageAbbr', abbr);
        this.setState({
            selectedLanguage: lang
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
                '<li id="chld"><a href="/messages">Messages</a></li>' +
                '<li id="chld" style="float:right";><a href="/Logout">Logout</a></li>' +
                '<li id="chld" style="float:right";><a href="/Settings">Settings</a></li>' +
                '<li id="chld" style="float:right";><a href="/Search" >Search</a></li>');
        }
    }


    render() {
        if (this.state.selectedLanguage !== "") {
            return (<Redirect
                push to={{
                    pathname: "/generalTest",
                    state: {
                        examLanguage: this.state.selectedLanguage
                    }
                }}
            />);
        }


        return (
            <MDBContainer fluid>

                <MDBRow>
                    <center><img className="backpicture" src=".\earth3.png" alt="." width="80%" /></center>
                    <MDBCol md="2"></MDBCol>
                    <MDBCol md="6">
                        <div >
                            <p className="title" >Please read carefully before taking your test</p>

                            <p className="text3">This tests consists of 10 questions with multiple choice answers.
                                Estimated lenght of this test is 30 minutes. Please be sure that
                                you are in a silent environment and you wont be distracted for
                                during the test and answer the question by yourself.
                            </p>
                            <p className="text3">Please select the language from the menu on the right to go to
                                corresponding placement test.
                            </p>
                            <p className="text3">
                                Good luck!
                            </p><br />
                            <p className="text3">
                                <b>Explanation of Grades: </b>
                            </p>
                            <p className="text3 ">
                                <b>
                                    C2 -> Proficiency <br />
                                    C1 -> Advanced <br />
                                    B2 -> Upper Intermediate <br />
                                    B1 -> Intermediate <br />
                                    A2 -> Elementary <br />
                                    A1 -> Beginner <br />
                                </b>
                            </p>
                        </div>
                    </MDBCol>
                    <MDBCol md="1"></MDBCol>
                    <MDBCol md="2">
                        {this.languageButtons()}
                    </MDBCol>

                </MDBRow>
            </MDBContainer>
        );
    }
}
