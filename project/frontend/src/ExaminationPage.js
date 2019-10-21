import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import './SignUp.css';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'


export default class ExaminationPage extends React.Component {
    constructor(props) {
        super(props);
        axios.get('http://18.184.207.248/api/language/', {withCredentials: true})
            .then(res => {
                this.setState({ languages: res.data });
            })
        this.state = {
            selectedLanguage: "",
            languages: [],
            isLogout : false
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

    onLogout() {
        axios.post('http://18.184.207.248/api/auth/logout', {withCredentials: true})
          .then(res => {
            //console.log(res);
            if (res.status === 200) {
              Cookies.remove('username');
              Cookies.remove('selectedExamLanguage');
              Cookies.remove('selectedExamGrade');
              Cookies.remove('selectedExamLanguageAbbr')
              this.setState({
                isLogout: true
              });
            }else{
              console.log("Log out failed");
            }
    
          });
    
        
      };

    render() {
        if (this.state.isLogout) {
            return (<Redirect
                to={{
                    pathname: "/"
                }}
            />);
        }
        if (this.state.selectedLanguage !== "") {
            return (<Redirect
                to={{
                    pathname: "/generalTest",
                    state: {
                        examLanguage: this.state.selectedLanguage
                    }
                }}
            />);
        }


        return (
            <MDBContainer fluid>

                <MDBRow className="topMargined50">
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
                            </p>
                        </div>
                    </MDBCol>
                    <MDBCol md="1"></MDBCol>
                    <MDBCol md="2">
                        {this.languageButtons()}
                    </MDBCol>

                </MDBRow>
                <MDBRow>
                    <MDBCol md="12">
                        <MDBBtn color="orange" onClick={this.onLogout.bind(this)} className="text2">Logout</MDBBtn>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}
