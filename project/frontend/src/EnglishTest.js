import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import Question from "./containers/Question";
import Popup from './Popup'; 
import axios from 'axios';

export default class EnglishTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showPopup: false };  
      }
    
       onClickd() {
        const frm = {
         //this json will be send to database
        };
        this.setState({  
            showPopup: !this.state.showPopup  
       });  
        console.log(JSON.stringify(frm));
        axios.post('http://ec2-52-59-191-167.eu-central-1.compute.amazonaws.com/api/auth/signup',  frm )
            .then(res => {
              console.log(res);
              if (res.status == 200) {
                console.log(this);
              }
            })
      
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

                        <Question id={1} question={"What are you giving Max for his birthday?"} answers={["A: I give him a gold watch.", "B: I'm giving a gold watch him.", "C: I'm giving him a few money.", "D: I'm giving him this antique watch."]} /><br/>
                        <Question id={2} question={"I was driving ______ the road when my car started making a funny sound."} answers={["in", "at", "away", "down"]} /><br/>
                        <Question id={3} question={"Whose keys are these?  ______ are mine."} answers={["A: They", "B: These", "C: It", " E: Whose"]} /><br/>
                        <MDBBtn color="orange" onClick={this.onClickd.bind(this)} className="text2"> Submit</MDBBtn>
                    </MDBCol>
                    <MDBCol md="3"></MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}
