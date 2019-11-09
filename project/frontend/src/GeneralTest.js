import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import Popup from './Popup';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie'
import './SignUp.css';

export default class GeneralTest extends React.Component {
    constructor(props) {
        super(props);
        axios.get('http://18.184.207.248/api/language/' + Cookies.get('selectedExamLanguageAbbr') + '/exam/questions', { withCredentials: true })
            .then(res => {
                console.log(res.data);
                this.setState({ questions: res.data });
            })
        this.state = {
            questions: [],
            submitted: false,
            showPopup: false,
            grade: undefined,
            examLanguage: undefined,
            language: undefined
        }
    }
    onClickd(id, qid, arr) {
        if (Cookies.get('selectedExamLanguageAbbr') === 'de') {
            arr[qid] = { question_id: "" + (qid + 5), choice_id: "" + id };
        } else {
            arr[qid] = { question_id: "" + qid, choice_id: "" + id };
        }

        console.log(arr);
    }
    generateQuestions(ans) {

        var ques = [];

        for (let i = 0; i < this.state.questions.length; i++) {
            ans[i] = { question_id: "" + this.state.questions[i].id, choice_id: undefined };
        }
        //var questionAnswer = [];     
        for (let i = 0; i < this.state.questions.length; i++) {

            ques[i] = (

                //<Question 
                //id={this.state.questions[i].id} 
                //question={(i+1)+ ". " +this.state.questions[i].desc} 
                //answers={questionAnswer}
                //choice_id = {this.state.choice_id}           
                ///>
                <div className="ExamBox">
                    <form>
                        <fieldset className="question"><p className="commentsec_title">{(i + 1) + ". " + this.state.questions[i].desc}</p>
                            <div className="answers radio-toolbar" >
                                <div className="answerstext">
                                    <label for="a"><input type="radio" id="1" name={i} onClick={this.onClickd.bind(this, this.state.questions[i].choices[0].id, i, ans)} />
                                        {this.state.questions[i].choices[0].desc}</label>
                                </div>
                                <div className="answerstext">
                                    <label for="b"><input type="radio" id="2" name={i} onClick={this.onClickd.bind(this, this.state.questions[i].choices[1].id, i, ans)} />
                                        {this.state.questions[i].choices[1].desc}</label>
                                </div>
                                <div className="answerstext">
                                    <label for="c"><input type="radio" id="3" name={i} onClick={this.onClickd.bind(this, this.state.questions[i].choices[2].id, i, ans)} />
                                        {this.state.questions[i].choices[2].desc}</label>
                                </div>
                                <div className="answerstext">
                                    <label for="d"><input type="radio" id="4" name={i} onClick={this.onClickd.bind(this, this.state.questions[i].choices[3].id, i, ans)} />
                                        {this.state.questions[i].choices[3].desc}</label>
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
        axios.post('http://18.184.207.248/api/language/' + Cookies.get('selectedExamLanguageAbbr') + '/exam/evaluate', ans, { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    console.log(ans);
                    console.log(res.data);
                    Cookies.set('selectedExamGrade', res.data.grade);
                    this.setState({
                        language: Cookies.get('selectedExamLanguage'),
                        grade: res.data.grade
                    });
                    this.setState({
                        showPopup: !this.state.showPopup
                    });


                }
            })

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
            '<li id="chld"><a href="/writing">Send Writing</a></li>' +
            '<li id="chld" style="float:right";><a href="/Logout">Logout</a></li>' +
            '<li id="chld" style="float:right";><a >Settings</a></li>');
        }
      }


    render() {
        if (this.state.submitted) {
            return (<Redirect
                push to={{
                    pathname: "/profile"
                }}
            />);
        }

        var ans = [];
        return (

            <MDBContainer fluid>
                <div>
                    {this.state.showPopup ?
                        <Popup
                            text={Cookies.get('selectedExamLanguage') + ": " + this.state.grade}
                            closePopup={this.close.bind(this)}
                        />
                        : null
                    }
                </div>

                <MDBRow>
                    <center><img className="backpicture" src=".\earth3.png" alt="." width="80%" /></center>
                    <MDBCol md="2"></MDBCol>

                    <MDBCol md="8">

                        {this.generateQuestions(ans)}

                        <MDBBtn color="green" onClick={this.submit.bind(this, ans)} className="text2"> Submit</MDBBtn>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}