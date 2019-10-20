 
import React from "react";
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardHeader, MDBBtnGroup } from 'mdbreact';
import './SignUp.css';
import { Redirect, NavLink, withRouter } from 'react-router-dom';
import { Radar } from 'react-chartjs-2';
import Cookies from 'js-cookie'

export default class FormPage extends React.Component {

  constructor(props) {
    console.log(Cookies.get('username'));
    super(props);
    this.state = {
      exercises: false,
      writing: false,
      isLogout: false,
      dataRadar: {
        labels: ["Listening", "Reading", "Writing", "Vocablory", "Grammar"],
        datasets: [
          {
            label: "english",
            backgroundColor: "rgba(245, 74, 85, 0.5)",
            data: [3.25, 7, 6, 5, 5]
          },
          {
            label: "german",
            backgroundColor: "rgba(90, 173, 246, 0.5)",
            data: [2.7, 4, 4.3, 7, 4]
          }
        ]
      }
    }
  }

  goToExercises() {
    this.setState({
      exercises: true,
      writing: false
    });
  };

  goToSendWriting() {
    this.setState({
      exercises: false,
      writing: true
    });
  };

  onLogout() {
    Cookies.remove('username');
    Cookies.remove('selectedExamLanguage');
    Cookies.remove('selectedExamGrade');
    Cookies.remove('selectedExamLanguageAbbr')
    this.setState({
      isLogout: true
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
    if (this.state.exercises) {
      return (<Redirect
        to={{
          pathname: "/exam"
        }}
      />);
    }

    if (this.state.writing) {
      return (<Redirect
        to={{
          pathname: "/writing"
        }}
      />);
    }

    //console.log("this.props.location.state", this.props.location.state)
    return (

      <MDBContainer fluid>
        <MDBRow className="header">

          <MDBCol md="10"><p className="rightaligned"></p></MDBCol>
          <MDBCol md="2">
            <img className="profilePic" src=".\profilePicture.png" alt="." width="50%" />
          </MDBCol>

        </MDBRow>
        <MDBRow className="topMargined10">
          <center><img className="backpicture" src=".\earth3.png" alt="." width="80%" /></center>
          <MDBCol md="2"></MDBCol>
          <MDBCol md="3"><div className="Scrollbar topMargined">
                        <div > <p className="commentsec_usrname marginedleft" >{ this.props.location.state.username}</p> </div>
                        <div > <p className="commentsec_usrname" > { this.props.location.state.language}</p> </div>
                        <div > <p className="commentsec_usrname" > { this.props.location.state.grade}</p> </div>
                        <div className="Bio"><p className = "commentsec_usrname">My Biography</p>
                        Hello there, I am Hatice! <br/>
                        I am a third year English Literature student in Boğaziçi University.
                        As a third year English Literature student, by now I feel 
                        quite well adjusted to a heavy workload and stacks of reading! 
                        I want to share my experiences with you! <br/>
                        Feel free to share your writings and text me if you like.<br/>

                        My favorite topics are 
                        <ul>
                          <li>literature</li>
                          <li>music</li>
                          <li>history</li>
                          <li>the works of Shakespeare</li>
                          <li>movies</li>
                          
                        </ul>
                        So feel free to write to me about any of those topics. 
                        
                         <br/>
                        <center>* * *</center>                        
                        Also if you send me writings sometimes I can leave a comment to your 
                        profile so be on the watch!
                         </div>

                    </div></MDBCol>
          <MDBCol md="3">
            <div className="Scrollbar topMargined">
             <div className="Comment">
                              <p className = "commentsec_usrname">James.Smith</p>
                              <p className = "commentsec_title">Very increadible grammar knowledge!</p>
                              <p>Thanks for reviewing my essay so detailed and spending 
                                your time to write a long and helpful comment on my profile
                                page!<br/>
                                You are the best! 
                              </p>
                            </div>
                            <div className="Comment">
                            <p className = "commentsec_usrname">Jeniffer_Brown</p>
                              <p className = "commentsec_title">Best mate ever!</p>
                              <p>I like how you make a comment after reading my work and tell how
                                I can improve my writing skills. Thanks to you I have learned a lot.
                                <br/>
                                Thanks for your time :)
                              </p>
                            </div>
                            <div className="Comment">
                            <p className = "commentsec_usrname">Emma_Williams</p>
                              <p className = "commentsec_title">Great person to chat with</p>
                              <p>We had a great conversation the other day and I learned lots
                                of vocabulary. 
                                <br/>
                                See you around buddy!
                              </p>
                            </div>
                            <div className="Comment">
                              <p className = "commentsec_usrname">Ethan_98</p>
                              <p className = "commentsec_title">Not an active user!</p>
                              <p>I have been waiting 1 week for the writing I sent.
                                If you are not going to be online why are you accepting messages?
                               
                              </p></div>
                            

                        </div>
          </MDBCol>
          <MDBCol md="4">
            <center><div class="btn-group topMargined" role="group" aria-label="Basic example">
              <MDBBtn color="orange" onClick={this.goToExercises.bind(this)} className="text2">Exercises</MDBBtn>
              <MDBBtn color="orange" onClick={this.goToSendWriting.bind(this)} className="text2">Send Writing</MDBBtn>
            </div></center>
            <MDBCard className="mb-5 topMargined">
              <MDBCardHeader>Language levels</MDBCardHeader>
              <MDBCardBody>
                <Radar data={this.state.dataRadar} options={{ responsive: true }} /></MDBCardBody>
            </MDBCard>

            <MDBRow>
              <MDBCol md="12">
                <MDBBtn color="orange" onClick={this.onLogout.bind(this)} className="text2">Logout</MDBBtn>
              </MDBCol>
            </MDBRow>

          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
