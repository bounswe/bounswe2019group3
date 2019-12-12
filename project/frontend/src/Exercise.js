import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import Popup from './Popup';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie'
import './General.css';
import { Player } from 'video-react';
import "../node_modules/video-react/dist/video-react.css"; // import css

export default class GeneralTest extends React.Component {
    
    constructor(props) {
        super(props);
        
        ///api/language/:language_abbr/exercise/:exersice_id/questions
        //console.log(Cookies.get('selectedLanguageAbbr') + "  "+ Cookies.get('selectedExerciseId'));
        axios.get('http://18.184.207.248/api/language/' + Cookies.get('selectedLanguageAbbr') + '/exercise/'+ Cookies.get('selectedExerciseId')+'/questions', { withCredentials: true })
            .then(res => {
                console.log(res.data);
                this.setState({ questions: res.data });
            })
        this.state = {
            questions: [],
            submitted: false,
            showPopup: false,
            grade: undefined,
            
        }
    }
    
    onClickd(id, qid, arr,index) {
        
            arr[index] = { question_id: "" + qid, choice_id: "" + id };
        

        console.log(arr);
    }
    
    generateListeningQuestions(ans) {
        
        var ques = [];

        for (let i = 0; i < this.state.questions.length; i++) {
            ans[i] = { question_id: "" + this.state.questions[i].id, choice_id: undefined };
        }
        
        for (let i = 0; i < this.state.questions.length; i++) {

            ques[i] = (

                
                <div className="ExamBox">
                    <form>
                        
                        
                        <Player
                        ref={(player) => { this.player = player }}></Player>
                        
                        playsInline
                        startTime = {this.state.questions[i].media_start_time}
                        src={'http://18.184.207.248/'+this.state.questions[i].media_url}

                        
                        />
                        <fieldset className="question"><p className="Question">{(i + 1) + ". " + this.state.questions[i].desc}</p>
                            <div className="answers radio-toolbar" >
                                <div className="answerstext">
                                    <label for="a"><input type="radio" id="1" name={i} onClick={this.onClickd.bind(this, this.state.questions[i].choices[0].choice_id, this.state.questions[i].question_id, ans,i)} />
                                        {this.state.questions[i].choices[0].desc}</label>
                                </div>
                                <div className="answerstext">
                                    <label for="b"><input type="radio" id="2" name={i} onClick={this.onClickd.bind(this, this.state.questions[i].choices[1].choice_id, this.state.questions[i].question_id, ans,i)} />
                                        {this.state.questions[i].choices[1].desc}</label>
                                </div>
                                <div className="answerstext">
                                    <label for="c"><input type="radio" id="3" name={i} onClick={this.onClickd.bind(this, this.state.questions[i].choices[2].choice_id, this.state.questions[i].question_id, ans,i)} />
                                        {this.state.questions[i].choices[2].desc}</label>
                                </div>
                                <div className="answerstext">
                                    <label for="d"><input type="radio" id="4" name={i} onClick={this.onClickd.bind(this, this.state.questions[i].choices[3].choice_id, this.state.questions[i].question_id, ans,i)} />
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
    generateWritingQuestions(ans) {
        
    }
    generateReadingQuestions(ans) {
        var ques = [];

        for (let i = 0; i < this.state.questions.length; i++) {
            ans[i] = { question_id: "" + this.state.questions[i].id, choice_id: undefined };
        }
        
        for (let i = 0; i < this.state.questions.length; i++) {

            ques[i] = (

               
                <div className="ExamBox">
                    <form>
                        <fieldset className="reading_question"><p className="readingQuestion">{(i + 1) + ". " + this.state.questions[i].desc}</p>
                            <div className="answers radio-toolbar" >
                                <div className="answerstext">
                                    <label for="a"><input type="radio" id="1" name={i} onClick={this.onClickd.bind(this, this.state.questions[i].choices[0].choice_id, this.state.questions[i].question_id, ans,i)} />
                                        {this.state.questions[i].choices[0].desc}</label>
                                </div>
                                <div className="answerstext">
                                    <label for="b"><input type="radio" id="2" name={i} onClick={this.onClickd.bind(this, this.state.questions[i].choices[1].choice_id, this.state.questions[i].question_id, ans,i)} />
                                        {this.state.questions[i].choices[1].desc}</label>
                                </div>
                                <div className="answerstext">
                                    <label for="c"><input type="radio" id="3" name={i} onClick={this.onClickd.bind(this, this.state.questions[i].choices[2].choice_id, this.state.questions[i].question_id, ans,i)} />
                                        {this.state.questions[i].choices[2].desc+this.state.questions[i].choices[2].id}</label>
                                </div>
                                <div className="answerstext">
                                    <label for="d"><input type="radio" id="4" name={i} onClick={this.onClickd.bind(this, this.state.questions[i].choices[3].choice_id, this.state.questions[i].question_id, ans,i)} />
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
    generateQuestions(ans) {

        var ques = [];

        for (let i = 0; i < this.state.questions.length; i++) {
            ans[i] = { question_id: "" + this.state.questions[i].id, choice_id: undefined };
        }
        
        for (let i = 0; i < this.state.questions.length; i++) {

            ques[i] = (

               
                <div className="ExamBox">
                    <form>
                        <fieldset className="question"><p className="commentsec_title">{(i + 1) + ". " + this.state.questions[i].desc}</p>
                            <div className="answers radio-toolbar" >
                                <div className="answerstext">
                                    <label for="a"><input type="radio" id="1" name={i} onClick={this.onClickd.bind(this, this.state.questions[i].choices[0].choice_id, this.state.questions[i].question_id, ans,i)} />
                                        {this.state.questions[i].choices[0].desc}</label>
                                </div>
                                <div className="answerstext">
                                    <label for="b"><input type="radio" id="2" name={i} onClick={this.onClickd.bind(this, this.state.questions[i].choices[1].choice_id, this.state.questions[i].question_id, ans,i)} />
                                        {this.state.questions[i].choices[1].desc}</label>
                                </div>
                                <div className="answerstext">
                                    <label for="c"><input type="radio" id="3" name={i} onClick={this.onClickd.bind(this, this.state.questions[i].choices[2].choice_id, this.state.questions[i].question_id, ans,i)} />
                                        {this.state.questions[i].choices[2].desc}</label>
                                </div>
                                <div className="answerstext">
                                    <label for="d"><input type="radio" id="4" name={i} onClick={this.onClickd.bind(this, this.state.questions[i].choices[3].choice_id, this.state.questions[i].question_id, ans,i)} />
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
        axios.post('http://18.184.207.248/api/language/' + Cookies.get('selectedExamLanguageAbbr') + '/exercise/'+Cookies.get('selectedExerciseId')+'/evaluate', ans, { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    //console.log(ans);
                    console.log(res.data);                
                    


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
            '<li id="chld"><a href="/messages">Messages</a></li>' +
            '<li id="chld" style="float:right";><a href="/Logout">Logout</a></li>' +
            '<li id="chld" style="float:right";><a >Settings</a></li>' +
            '<li id="chld" style="float:right";><a href="/Search" >Search</a></li>');
        }
      }


    render() {
        if (this.state.submitted) {
            return (<Redirect
                push to={{
                    pathname: "/exercises"
                }}
            />);
        }
        //console.log (Cookies.get('selectedType'));
        var ans = [];
        if(Cookies.get('selectedType') === 'listening'){
            //console.log (Cookies.get('selectedType') + ' in listening');
            return (

                <MDBContainer fluid>
                    <div>
                        {this.state.showPopup ?
                            <Popup
                                text={Cookies.get('selectedLanguageAbbr') + ": " + this.state.grade}
                                closePopup={this.close.bind(this)}
                            />
                            : null
                        }
                    </div>
    
                    <MDBRow>
                        <center><img className="backpicture" src=".\earth3.png" alt="." width="80%" /></center>
                        <MDBCol md="2"></MDBCol>
    
                        <MDBCol md="8">
    
                            {this.generateListeningQuestions(ans)}
    
                            <MDBBtn color="green" onClick={this.submit.bind(this, ans)} className="text2"> Submit</MDBBtn>
                        </MDBCol>
                        <MDBCol md="2"></MDBCol>
                    </MDBRow>
                </MDBContainer>
            );
        }
        else if(Cookies.get('selectedType') === 'writing'){
            //console.log (Cookies.get('selectedType') + ' in writing');
            return (

                <MDBContainer fluid>
                    <div>
                        {this.state.showPopup ?
                            <Popup
                                text={Cookies.get('selectedLanguageAbbr') + ": " + this.state.grade}
                                closePopup={this.close.bind(this)}
                            />
                            : null
                        }
                    </div>
    
                    <MDBRow>
                        <center><img className="backpicture" src=".\earth3.png" alt="." width="80%" /></center>
                        <MDBCol md="2"></MDBCol>
    
                        <MDBCol md="8">
    
                            {this.generateWritingQuestions(ans)}
    
                            <MDBBtn color="green" onClick={this.submit.bind(this, ans)} className="text2"> Submit</MDBBtn>
                        </MDBCol>
                        <MDBCol md="2"></MDBCol>
                    </MDBRow>
                </MDBContainer>
            );
        }
        else if(Cookies.get('selectedType') === 'reading'){
            //console.log (Cookies.get('selectedType') + ' in else');
            return (

                <MDBContainer fluid>
                    <div>
                        {this.state.showPopup ?
                            <Popup
                                text={Cookies.get('selectedLanguageAbbr') + ": " + this.state.grade}
                                closePopup={this.close.bind(this)}
                            />
                            : null
                        }
                    </div>
    
                    <MDBRow>
                        <center><img className="backpicture" src=".\earth3.png" alt="." width="80%" /></center>
                        <MDBCol md="2"></MDBCol>
    
                        <MDBCol md="8">
    
                            {this.generateReadingQuestions(ans)}
    
                            <MDBBtn color="green" onClick={this.submit.bind(this, ans)} className="text2"> Submit</MDBBtn>
                        </MDBCol>
                        <MDBCol md="2"></MDBCol>
                    </MDBRow>
                </MDBContainer>
            );
        }
        else{
            return (

                <MDBContainer fluid>
                    <div>
                        {this.state.showPopup ?
                            <Popup
                                text={Cookies.get('selectedLanguageAbbr') + ": " + this.state.grade}
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
}