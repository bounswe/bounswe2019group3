import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import './SignUp.css';
var usrname;
var pass;
var mail;
function onClickd (){
  
  
  const frm  = {
  usrname : document.getElementById("usr").value,
  pass : document.getElementById("pass").value,
  mail : document.getElementById("mail").value
  };
  console.log(JSON.stringify(frm));

};

const FormPage = () => {
  return (
    <MDBContainer fluid>
      <MDBRow className = "header"><img src=".\header.png" alt= "." width = "100%"/></MDBRow>
      <MDBRow>
      <MDBCol md="8">
      <img src=".\earth3.png" alt= "." width = "100%"/>
      </MDBCol>
        <MDBCol className = "margined" md="4">
         
        
          <form>
            <p className="text text-center mb-4">SIGN UP</p>
            <div className="white-text">
              <MDBInput  
                id = "usr"  
                label="Username"
                icon="user"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                
              />
              <MDBInput
              id = "mail"
                label="Email"
                icon="envelope"
                group
                type="email"
                validate
                error="wrong"
                success="right"
              />            
              <MDBInput
              id = "pass"
                label="Password"
                icon="lock"
                group
                type="password"
                validate
              />
              
            </div>
            <div className="text-center">
              <MDBBtn color="orange" onClick = {onClickd} className = "text2"> Register</MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default FormPage;