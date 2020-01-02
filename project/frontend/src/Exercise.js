import React from "react";
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBRow, MDBCol } from 'mdbreact';
import Popup from './Popup';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie'
import './General.css';



export default class GeneralTest extends React.Component {

    constructor(props) {
        super(props);

        ///api/language/:language_abbr/exercise/:exersice_id/questions
        //console.log(Cookies.get('selectedLanguageAbbr') + "  "+ Cookies.get('selectedExerciseId'));
        axios.get('http://localhost:3000/api/language/' + Cookies.get('selectedLanguageAbbr') + '/exercise/' + Cookies.get('selectedExerciseId') + '/questions', { withCredentials: true })
            .then(res => {
                console.log(res.data);
                this.setState({ questions: res.data });
            })
        this.state = {
            questions: [],
            submitted: false,
            showPopup: false,
            grade: undefined,
            modal:false,
            nb_correct_answers: undefined,
            nb_questions: undefined
        }
    }

    onClickd(id, qid, arr, index) {

        arr[index] = { question_id: "" + qid, choice_id: "" + id };


        console.log(arr);
    }

    generateListeningQuestions(ans) {

        var ques = [];

        for (let i = 0; i < this.state.questions.length; i++) {
            ans[i] = { question_id: "" + this.state.questions[i].question_id, choice_id: undefined };
        }

        for (let i = 0; i < this.state.questions.length; i++) {

            ques[i] = (


                <div className="ExamBox">
                    <audio id={"myaudio" + i} controls>
                        <source src={'http://localhost:3000/' + this.state.questions[i].media_url} type="video/mp4" />
                        Your browser does not support the audio element.
                    </audio>
                    <form>
                        <fieldset className="question"><p className="Question">{(i + 1) + ". " + this.state.questions[i].desc}</p>
                            <div className="answers radio-toolbar" >
                            <div className={"answerstext " + (this.state.questions[i].answer_id == this.state.questions[i].choices[0].choice_id ? 'green' : '')}>
                                    <label for="a"><input type="radio" id="1" name={i} onClick={this.onClickd.bind(this, this.state.questions[i].choices[0].choice_id, this.state.questions[i].question_id, ans, i)} />
                                        {this.state.questions[i].choices[0].desc}</label>
                                </div>
                                <div className={"answerstext " + (this.state.questions[i].answer_id == this.state.questions[i].choices[1].choice_id ? 'green' : '')}>
                                    <label for="b"><input type="radio" id="2" name={i} onClick={this.onClickd.bind(this, this.state.questions[i].choices[1].choice_id, this.state.questions[i].question_id, ans, i)} />
                                        {this.state.questions[i].choices[1].desc}</label>
                                </div>
                                <div className={"answerstext " + (this.state.questions[i].answer_id == this.state.questions[i].choices[2].choice_id ? 'green' : '')}>
                                    <label for="c"><input type="radio" id="3" name={i} onClick={this.onClickd.bind(this, this.state.questions[i].choices[2].choice_id, this.state.questions[i].question_id, ans, i)} />
                                        {this.state.questions[i].choices[2].desc}</label>
                                </div>
                                <div className={"answerstext " + (this.state.questions[i].answer_id == this.state.questions[i].choices[3].choice_id ? 'green' : '')}>
                                    <label for="d"><input type="radio" id="4" name={i} onClick={this.onClickd.bind(this, this.state.questions[i].choices[3].choice_id, this.state.questions[i].question_id, ans, i)} />
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
            ans[i] = { question_id: "" + this.state.questions[i].question_id, choice_id: undefined };
        }

        for (let i = 0; i < this.state.questions.length; i++) {
            console.log(i, this.state.questions[i].answer_id);
            ques[i] = (


                <div className="ExamBox">
                    <form>
                        <fieldset className="reading_question"><p className="readingQuestion">{(i + 1) + ". " + this.state.questions[i].desc}</p>
                            <div className="answers radio-toolbar" >
                                <div className={"answerstext " + (this.state.questions[i].answer_id == this.state.questions[i].choices[0].choice_id ? 'green' : '')}>
                                    <label for="a"><input type="radio" id="1" name={i} onClick={this.onClickd.bind(this, this.state.questions[i].choices[0].choice_id, this.state.questions[i].question_id, ans, i)} />
                                        {this.state.questions[i].choices[0].desc}</label>
                                </div>
                                <div className={"answerstext " + (this.state.questions[i].answer_id == this.state.questions[i].choices[1].choice_id ? 'green' : '')}>
                                    <label for="b"><input type="radio" id="2" name={i} onClick={this.onClickd.bind(this, this.state.questions[i].choices[1].choice_id, this.state.questions[i].question_id, ans, i)} />
                                        {this.state.questions[i].choices[1].desc}</label>
                                </div>
                                <div className={"answerstext " + (this.state.questions[i].answer_id == this.state.questions[i].choices[2].choice_id ? 'green' : '')}>
                                    <label for="c"><input type="radio" id="3" name={i} onClick={this.onClickd.bind(this, this.state.questions[i].choices[2].choice_id, this.state.questions[i].question_id, ans, i)} />
                                        {this.state.questions[i].choices[2].desc }</label>
                                </div>
                                <div className={"answerstext " + (this.state.questions[i].answer_id == this.state.questions[i].choices[3].choice_id ? 'green' : '')}>
                                    <label for="d"><input type="radio" id="4" name={i} onClick={this.onClickd.bind(this, this.state.questions[i].choices[3].choice_id, this.state.questions[i].question_id, ans, i)} />
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
            ans[i] = { question_id: "" + this.state.questions[i].question_id, choice_id: undefined };
        }
        

        for (let i = 0; i < this.state.questions.length; i++) {

            ques[i] = (


                <div className="ExamBox">
                    <form>
                        <fieldset className="question"><p className="commentsec_title">{(i + 1) + ". " + this.state.questions[i].desc}</p>
                            <div className="answers radio-toolbar" >
                            <div className={"answerstext " + (this.state.questions[i].answer_id == this.state.questions[i].choices[0].choice_id ? 'green' : '')}>
                                    <label for="a"><input type="radio" id="1" name={i} onClick={this.onClickd.bind(this, this.state.questions[i].choices[0].choice_id, this.state.questions[i].question_id, ans, i)} />
                                        {this.state.questions[i].choices[0].desc}</label>
                                </div>
                                <div className={"answerstext " + (this.state.questions[i].answer_id == this.state.questions[i].choices[1].choice_id ? 'green' : '')}>
                                    <label for="b"><input type="radio" id="2" name={i} onClick={this.onClickd.bind(this, this.state.questions[i].choices[1].choice_id, this.state.questions[i].question_id, ans, i)} />
                                        {this.state.questions[i].choices[1].desc}</label>
                                </div>
                                <div className={"answerstext " + (this.state.questions[i].answer_id == this.state.questions[i].choices[2].choice_id ? 'green' : '')}>
                                    <label for="c"><input type="radio" id="3" name={i} onClick={this.onClickd.bind(this, this.state.questions[i].choices[2].choice_id, this.state.questions[i].question_id, ans, i)} />
                                        {this.state.questions[i].choices[2].desc}</label>
                                </div>
                                <div className={"answerstext " + (this.state.questions[i].answer_id == this.state.questions[i].choices[3].choice_id ? 'green' : '')}>
                                    <label for="d"><input type="radio" id="4" name={i} onClick={this.onClickd.bind(this, this.state.questions[i].choices[3].choice_id, this.state.questions[i].question_id, ans, i)} />
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
        
        console.log('http://localhost:3000/api/language/' + Cookies.get('selectedLanguageAbbr') + '/exercise/' + Cookies.get('selectedExerciseId') + '/evaluate')
        axios.post('http://localhost:3000/api/language/' + Cookies.get('selectedLanguageAbbr') + '/exercise/' + Cookies.get('selectedExerciseId') + '/evaluate', ans, { withCredentials: true })
            .then(res => {              
                if (res.status === 200) {
                 
                    let q_answers = res.data.answers;
                    let questions = this.state.questions;
                    questions = questions.map(q => {
                        q = JSON.parse(JSON.stringify(q));
                        q.answer_id = q_answers.find(a => a.question_id == q.question_id).choice_id;
                        return q;
                    });
                   
                    this.setState({questions: questions,nb_questions: res.data.nb_questions, nb_correct_answers: res.data.nb_correct_answers});
                    console.log(ans);
                    console.log(res.data);
                    this.show_result(res.data);
                    this.toggle();   
                }
            })

    };

    show_result(result){
        var correct_ans = [];

        for(let i=0; i< result.answers.length; i++){        
         // console.log(result.answers[i].choice_id)
         for(let j=0; j < 4; j++){
          if(result.answers[i].choice_id===this.state.questions[i].choices[j].choice_id){
              console.log(result.answers[i].choice_id)
              console.log(this.state.questions[i].choices[j].desc)
            
              correct_ans[i] = (


                <div className="ExamBox">
                    <form>
                       <p>{this.state.questions[i].choices[j].desc}</p>
                    </form>
                </div>

            );
          } 
          
        }
          
        }
        return correct_ans;
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
                '<li id="chld"><a href="/sendexercise">Send Exercise</a></li>'+
                '<li id="chld"><a href="/exam">Exam</a></li>' +
                '<li id="chld"><a href="/writingsList">My Writings</a></li>'+
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
    toggle = () => {
        console.log(this.state.modal);
        this.setState({
          modal: !this.state.modal
        });
      }


    render() {
        console.log(this.state.questions)
        if (this.state.submitted) {
            return (<Redirect
                push to={{
                    pathname: "/exercises"
                }}
            />);
        }
        //console.log (Cookies.get('selectedType'));
        var ans = [];
        if (Cookies.get('selectedType') === 'listening') {
            //console.log (Cookies.get('selectedType') + ' in listening');
            return (

                <MDBContainer fluid>                
                    <MDBRow>
                        <center><img className="backpicture" src=".\earth3.png" alt="." width="80%" /></center>
                        <MDBCol md="2"></MDBCol>

                        <MDBCol md="8">
                        <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                                <MDBModalHeader toggle={this.toggle}>Result</MDBModalHeader>
                                <MDBModalBody>
                                You knew {this.state.nb_correct_answers} correct answer!
                                </MDBModalBody>
                                <MDBModalFooter>
                                    <MDBBtn color="orange" onClick={this.toggle}>Close</MDBBtn>                                    
                                </MDBModalFooter>
                            </MDBModal>
                            {this.generateListeningQuestions(ans)}

                            <MDBBtn color="green" onClick={this.submit.bind(this, ans)} className="text2"> Submit</MDBBtn>
                        </MDBCol>
                        <MDBCol md="2"></MDBCol>
                    </MDBRow>
                </MDBContainer>
            );
        }
        else if (Cookies.get('selectedType') === 'writing') {
            //console.log (Cookies.get('selectedType') + ' in writing');
            return (

                <MDBContainer fluid>     
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
        else if (Cookies.get('selectedType') === 'reading') {
            //console.log (Cookies.get('selectedType') + ' in else');
            return (

                <MDBContainer fluid>                  
                    <MDBRow>
                        <center><img className="backpicture" src=".\earth3.png" alt="." width="80%" /></center>
                        <MDBCol md="2"></MDBCol>

                        <MDBCol md="8">
                        <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                                <MDBModalHeader toggle={this.toggle}>Result</MDBModalHeader>
                                <MDBModalBody>
                                You knew {this.state.nb_correct_answers} correct answer!
                                
                                </MDBModalBody>
                                <MDBModalFooter>
                                    <MDBBtn color="orange" onClick={this.toggle}>Close</MDBBtn>                                    
                                </MDBModalFooter>
                            </MDBModal>
                            {this.generateReadingQuestions(ans)}

                            <MDBBtn color="green" onClick={this.submit.bind(this, ans)} className="text2"> Submit</MDBBtn>
                        </MDBCol>
                        <MDBCol md="2"></MDBCol>
                    </MDBRow>
                </MDBContainer>
            );
        }
        else {
            return (

                <MDBContainer fluid>              
                    <MDBRow>
                        <center><img className="backpicture" src=".\earth4.png" alt="." width="80%" /></center>
                        <MDBCol md="2"></MDBCol>

                        <MDBCol md="8">
                            <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                                <MDBModalHeader toggle={this.toggle}>Result</MDBModalHeader>
                                <MDBModalBody>
                                You knew {this.state.nb_correct_answers} correct answer!
                                </MDBModalBody>
                                <MDBModalFooter>
                                    <MDBBtn color="orange" onClick={this.toggle}>Close</MDBBtn>                                    
                                </MDBModalFooter>
                            </MDBModal>
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