import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import './SignUp.css';
import { Redirect, NavLink, withRouter } from 'react-router-dom';
import axios from 'axios';
import { thisExpression } from '@babel/types';


export default class ExaminationPage extends React.Component {
    constructor(props) {
        super(props);
        var responseStatus =[] ;
        axios.get('http://ec2-52-59-191-167.eu-central-1.compute.amazonaws.com/api/language/')
      .then(res => {
        
        responseStatus = res.data;
        this.setState({languages: responseStatus});
        console.log(responseStatus[0]);
      })
        this.state = {
            selectedLanguage : "",
            languages : []
        }
    }


    languageButtons(){
        var lang = [];
        for(let i=0 ; i < this.state.languages.length ; i++){
            lang[i] = (
                <MDBBtn 
                    color="orange"
                    id= {this.state.languages[i].abbr}
                    onClick={() => this.goToExam(this.state.languages[i].name)}
                    className="text2 btn-block "
                >{this.state.languages[i].name} </MDBBtn>
            );
        }
        return lang;
    }

    goToExam(lang){
        this.setState({ 
            selectedLanguage : lang
        });
    }

    

    render() {


        if (this.state.selectedLanguage !== "") {
            return (<Redirect
              to={{
                pathname: "/" + this.state.selectedLanguage
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
                    { this.languageButtons() }
                    </MDBCol>
                    
                </MDBRow>
            </MDBContainer>
        );
    }
}
