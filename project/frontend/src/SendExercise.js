import React from "react";
import { MDBInput,MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBRow, MDBCol } from 'mdbreact';
import Popup from './Popup';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie'
import './General.css';



export default class GeneralTest extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            questions: [],
            submitted: false,
            showPopup: false,
            grade: undefined,
            submit: []

        }
    }

    onClickd(id, qid, arr, index) {

        arr[index] = { question_id: "" + qid, choice_id: "" + id };


        console.log(arr);
    }

    generateQuestions() {

        var ques = [];


        for (let i = 0; i < 5; i++) {

            ques[i] = (
                <div className="ExamBox">
                    <form id={"form_q" + i}>
                        <fieldset className="question"><textarea class="form-control rounded-0" id={"q" + i} rows="7"></textarea>
                            <div className="answers radio-toolbar" >
                                <div className="answerstext" >
                                    <input type="radio" name={i} value={0} />
                                    <input  type="text" id={"q" + i + "a0"} />
                                </div>
                                <div  className="answerstext" >
                                    <input type="radio" name={i} value={1} />
                                    <input type="text" id={"q" + i + "a1"} />
                                </div>
                                <div className="answerstext" >
                                    <input type="radio" name={i} value={2} />
                                    <input type="text" id={"q" + i + "a2"} />
                                </div>
                                <div className="answerstext" >
                                    <input type="radio" name={i} value={3} />
                                    <input type="text" id={"q" + i + "a3"} />
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>

            );

        }
        return ques;
    }



    submit(ans) {
        try {
            const frm = {
                title: document.getElementById("title").value,
                lang_abbr: document.getElementById("lang_abbr").value,
                level: document.getElementById("level").value,
                exercise_type: document.getElementById("exercise_type").value,
                exercise_questions: []
            };
            for (let i = 0; i < 5; i++) {
                frm.exercise_questions[i] = {
                    desc: document.getElementById("q" + i).value,
                    answer: parseInt(document.querySelector('input[name="' + i + '"]:checked').value),
                    choices: [
                        {
                            desc: document.getElementById("q" + i + "a0").value
                        },
                        {
                            desc: document.getElementById("q" + i + "a1").value
                        },
                        {
                            desc: document.getElementById("q" + i + "a2").value
                        },
                        {
                            desc: document.getElementById("q" + i + "a3").value
                        }
                    ]
                };
                console.log(frm);
            }
            document.getElementById("");
            console.log('http://18.184.207.248/api/language/' + Cookies.get('selectedLanguageAbbr') + '/exercise/' + Cookies.get('selectedExerciseId') + '/evaluate')
            axios.post('http://18.184.207.248/api/language/' + frm.lang_abbr  + '/exercise',  frm, { withCredentials: true })
                .then(res => {
                    if (res.status === 200) {
                        console.log(res.data);



                    }
                })
        } catch{
            alert("hata............");
        }

    };

    close() {
        this.setState({
            submitted: true
        });
    };


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
                '<li id="chld"><a href="/writingsList">My Writings</a></li>' +
                '<li id="chld"><a href="/writing">Send Writing</a></li>' +
                '<li id="chld"><a href="/messages">Messages</a></li>' +
                '<li id="chld" style="float:right";><a href="/Logout">Logout</a></li>' +
                '<li id="chld" style="float:right";><a >Settings</a></li>' +
                '<li id="chld" style="float:right";><a href="/Search" >Search</a></li>');
        }
    }

    componentDidUpdate() {
        if (Cookies.get('selectedType') === 'listening') {
            for (let i = 0; i < this.state.questions.length; i++) {
                const audio = document.getElementById("myaudio" + i);
                const start_time = this.state.questions[i].media_start_time;
                const end_time = this.state.questions[i].media_end_time;
                audio.currentTime = start_time;
                audio.addEventListener('timeupdate', (event) => {
                    if (audio.currentTime < start_time || audio.currentTime > end_time) {
                        audio.pause();
                        audio.currentTime = start_time;
                    }
                });
            }
        }
    }


    render() {
        var ans = [];
        if (this.state.submitted) {
            return (<Redirect
                push to={{
                    pathname: "/profile"
                }}
            />);
        }
        else {
            return (

                <MDBContainer fluid>
                    <MDBRow>
                        <center><img className="backpicture" src=".\earth4.png" alt="." width="80%" /></center>
                        <MDBCol md="2"></MDBCol>
                        <MDBCol md="8">
                            <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                                <MDBModalHeader toggle={this.toggle}>Answers</MDBModalHeader>
                                <MDBModalBody>
                                    (...)
                                </MDBModalBody>
                                <MDBModalFooter>
                                    <MDBBtn color="orange" onClick={this.toggle}>Close</MDBBtn>
                                </MDBModalFooter>
                            </MDBModal>
                            <MDBInput
                                id="title"
                                label="Title"

                                type="text"



                            />

                            <div>
                                <select id="lang_abbr" class="browser-default custom-select mb-4">
                                    <option>Choose language</option>
                                    <option value="en">English</option>
                                    <option value="de">Deutch</option>
                                </select>
                            </div>
                            <div>
                                <select id="level" class="browser-default custom-select mb-4">
                                    <option>Choose level</option>
                                    <option value="A1">A1</option>
                                    <option value="A2">A2</option>
                                    <option value="B1">B1</option>
                                    <option value="B2">B2</option>
                                    <option value="C1">C1</option>
                                    <option value="C2">C2</option>
                                </select>
                            </div>
                            <div>
                                <select id="exercise_type" class="browser-default custom-select mb-4">
                                    <option>Exercise Type</option>
                                    <option value="grammar">Grammar</option>
                                    <option value="vocabulary">Vocabulary</option>
                                    <option value="reading">Reading</option>
                                </select>
                            </div>
                            {this.generateQuestions(ans)}
                            <MDBBtn color="green" onClick={this.submit.bind(this, ans)} className="text2"> Submit</MDBBtn>
                        </MDBCol>
                        <MDBCol md="2"></MDBCol>
                    </MDBRow>
                </MDBContainer >
            );
        }
    }
}