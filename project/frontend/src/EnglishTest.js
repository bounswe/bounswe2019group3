import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import Question from "./containers/Question";
import Popup from './Popup'; 
import axios from 'axios';

export default class EnglishTest extends React.Component {
    constructor(props) {
        super(props);
        axios.get('http://ec2-52-59-191-167.eu-central-1.compute.amazonaws.com/api/language/en/exam/questions')
      .then(res => {
        this.setState({questions: res.data});
      })
        this.state = {
            questions : []
        }
    }
    
      generateQuestions(){
        var ques = [];
        for(let i=0 ; i < this.state.questions.length ; i++){
            var questionAnswer = [];
            for(var j=0;j<this.state.questions[i].choices.length;j++){
                questionAnswer[j]=this.state.questions[i].choices[j].desc;
            }
            ques[i] = (
                <Question 
                id={this.state.questions[i].id} 
                question={(i+1)+ ". " +this.state.questions[i].desc} 
                answers={questionAnswer}
               />
            );
        }
        return ques;
    }

       onClickd() {
        const frm = {
         //this json will be send to database
        };
        this.setState({  
            showPopup: !this.state.showPopup  
       });  
        console.log(JSON.stringify(frm));
        
      
      };
    
    render() {
        return (
            <MDBContainer fluid>
                <div> 
                    {this.state.showPopup ?  
                    <Popup  
                            text='Grade:'  
                            closePopup={this.onClickd.bind(this)}  
                    />  
                    : null  
                    }  
                    </div>

                <MDBRow className="topMargined50">
                    <center><img className="backpicture" src=".\earth3.png" alt="." width="80%" /></center>
                    <MDBCol md="3"></MDBCol>
                    
                    <MDBCol md="6">

                        { this.generateQuestions() }

                        <MDBBtn color="orange" onClick={this.onClickd.bind(this)} className="text2"> Submit</MDBBtn>
                    </MDBCol>
                    <MDBCol md="3"></MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}
