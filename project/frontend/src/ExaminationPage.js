import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import './SignUp.css';
import { Redirect, NavLink, withRouter } from 'react-router-dom';
import axios from 'axios';


export default class ExaminationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

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
                        
                        <MDBBtn color="orange" className="text2 btn-block ">English </MDBBtn>
                        <MDBBtn color="orange" className="text2 btn-block ">German</MDBBtn>
                        <MDBBtn color="orange" className="text2 btn-block ">French </MDBBtn>
                        <MDBBtn color="orange" className="text2 btn-block ">Italian</MDBBtn>
                       
                        
                    </MDBCol>
                    
                </MDBRow>
            </MDBContainer>
        );
    }
}
