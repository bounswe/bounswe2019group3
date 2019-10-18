import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import Question from "./containers/Question";
import Popup from './Popup';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie'

export default class GeneralTest extends React.Component {
    constructor(props) {
        super(props);
        axios.get('http://18.184.207.248/api/language/' + Cookies.get('selectedExamLanguageAbbr') + '/exam/questions')
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
        arr[qid] = { question_id: "" + qid, choice_id: "" + id };
        //console.log(arr);
    }
    generateQuestions(ans) {

        var ques = [];

        // for (let i = 0; i < this.state.questions.length; i++) {
        //     ans[i] = { question_id: "" + this.state.questions[i].id, choice_id: "" };
        // }
        //var questionAnswer = [];     
        for (let i = 0; i < this.state.questions.length; i++) {

            ques[i] = (

                //<Question 
                //id={this.state.questions[i].id} 
                //question={(i+1)+ ". " +this.state.questions[i].desc} 
                //answers={questionAnswer}
                //choice_id = {this.state.choice_id}           
                ///>
                <form>
                    <fieldset className="question text3">{(i + 1) + ". " + this.state.questions[i].desc}<br />
                        <div className="answers" >
                            <div>
                                <input type="radio" id="1" name={i} onClick={this.onClickd.bind(this, this.state.questions[i].choices[0].id, i, ans)} />
                                <label for="a">{this.state.questions[i].choices[0].desc}</label>
                            </div>
                            <div>
                                <input type="radio" id="2" name={i} onClick={this.onClickd.bind(this, this.state.questions[i].choices[1].id, i, ans)} />
                                <label for="b">{this.state.questions[i].choices[1].desc}</label>
                            </div>
                            <div>
                                <input type="radio" id="3" name={i} onClick={this.onClickd.bind(this, this.state.questions[i].choices[2].id, i, ans)} />
                                <label for="c">{this.state.questions[i].choices[2].desc}</label>
                            </div>
                            <div>
                                <input type="radio" id="4" name={i} onClick={this.onClickd.bind(this, this.state.questions[i].choices[3].id, i, ans)} />
                                <label for="c">{this.state.questions[i].choices[3].desc}</label>
                            </div>
                        </div>
                    </fieldset>
                </form>

            );

        }
        return ques;
    }



    submit(ans) {
        axios.post('http://18.184.207.248/api/language/' + Cookies.get('selectedExamLanguageAbbr') + '/exam/evaluate', ans)
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


    render() {
        if (this.state.submitted) {
            return (<Redirect
                to={{
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

                <MDBRow className="topMargined50">
                    <center><img className="backpicture" src=".\earth3.png" alt="." width="80%" /></center>
                    <MDBCol md="3"></MDBCol>

                    <MDBCol md="6">

                        {this.generateQuestions(ans)}

                        <MDBBtn color="green" onClick={this.submit.bind(this, ans)} className="text2"> Submit</MDBBtn>
                    </MDBCol>
                    <MDBCol md="3"></MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}