
import React from "react";
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardHeader, MDBIcon } from 'mdbreact';
import './SignUp.css';
import { Redirect } from 'react-router-dom';
import { Radar } from 'react-chartjs-2';
import Cookies from 'js-cookie'
import axios from "axios";
import StarRatingComponent from 'react-star-rating-component';

export default class FormPage extends React.Component {

  constructor(props) {
    super(props);
    axios.get(('http://18.184.207.248/api/user/' + Cookies.get('username')), { withCredentials: true })
      .then(res => {
        console.log(res.data);
        this.setState({ information: res.data });
      })
    axios.get('http://18.184.207.248/api/user/' + Cookies.get('username') + '/comments', { withCredentials: true })
      .then(res => {
        console.log(res.data);
        this.setState({ comments: res.data });
      })
    axios.get('http://18.184.207.248/api/user/' + Cookies.get('username') + '/language/level', { withCredentials: true })
      .then(res => {
        console.log(res.data);
        this.setState({ languages: res.data });
      })

    this.state = {
      comments: [],
      languages: [],
      information: [],
      exercises: false,
      writing: false,
      dataRadar: {
        labels: ["Listening", "Reading", "Writing", "Vocabulary", "Grammar"],
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

  commentField() {
    var comm = [];
    for (let i = 0; i < this.state.comments.length; i++) {
      comm[i] = (
        <div className="Comment">

          <p className="commentsec_title">Very increadible grammar knowledge!</p>
          <p>{this.state.comments[i].text}</p>
          
          <p className="commentsec_usrname rightaligned small">{this.state.comments[i].comment_by}</p>
        </div>
      );
    }
 
    
    return comm;
  }

  languagesWithLevels() {
    var lan = [];
    for (let i = 0; i < this.state.languages.length; i++) {
      lan[i] = (
        <MDBCol md="4" className="topMargined commentsec_usrname">
          <div >
            <p > {this.state.languages[i].lang_abbr} -> {this.state.languages[i].grade}  </p>
          </div>
        </MDBCol>

      );
    }
    return lan;
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
    axios.post('http://18.184.207.248/api/auth/logout', {}, { withCredentials: true })
      .then(res => {
        //console.log(res);
        if (res.status === 204) {
          Cookies.remove('username');
          Cookies.remove('selectedExamLanguage');
          Cookies.remove('selectedExamGrade');
          Cookies.remove('selectedExamLanguageAbbr')
          this.setState({
            isLogout: true
          });
        } else {
          console.log("Log out failed");
        }

      });


  };

  render() {
    if (this.state.isLogout) {
      return (<Redirect
        push to={{
          pathname: "/"
        }}
      />);
    }
    if (this.state.exercises) {
      return (<Redirect
        push to={{
          pathname: "/exam"
        }}
      />);
    }

    if (this.state.writing) {
      return (<Redirect
        push to={{
          pathname: "/writing"
        }}
      />);
    }


    //console.log("this.props.location.state", this.props.location.state)
    return (

      <MDBContainer fluid>
        <MDBRow>
          <center><img className="backpicture" src=".\earth3.png" alt="." width="80%" /></center>

          <MDBCol md="4">

            <div className="fixedsizebio">
              <div className="marginedleft20">
                <MDBRow>

                  <MDBCol md="6">
                    <MDBRow>
                      <MDBCol>
                        <div > <p className="commentsec_usrname topMargined" >{this.state.information.username}</p> </div>
                        <StarRatingComponent
                          editing={false}
                          starCount={5}
                          value={this.state.information.rating}
                          size="50px"
                        />
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>

                  <MDBCol md="6">
                    <img className="profilePic topMargined marginedleft50" src={this.state.information.avatar} alt="." />
                  </MDBCol>
                </MDBRow>
                <MDBRow>

                  <MDBCol>
                    <MDBRow>
                      {this.languagesWithLevels()}
                    </MDBRow>
                    <MDBRow>


                      <div className="Bio"><p className="commentsec_usrname">My Biography</p>
                        {this.state.information.bio}
                      </div>
                      <div > <p className=" topMargined marginedleft" >
                        <MDBIcon icon="envelope" className="mr-3" />
                        {this.state.information.email}</p> </div>

                    </MDBRow>


                  </MDBCol>

                </MDBRow>
              </div>
            </div>
          </MDBCol>


          <MDBCol md="4">
            <div className="Scrollbar">
              {this.commentField()}
            </div>
          </MDBCol>
          <MDBCol md="4">
            <MDBRow>
              
                <MDBCol md="6">
                  <center>
                  <MDBBtn color="orange" onClick={this.goToExercises.bind(this)} className="text2">Exams</MDBBtn>
                  </center>
                </MDBCol>                
                <MDBCol md="6">
                  <center>
                  <MDBBtn color="orange" onClick={this.goToSendWriting.bind(this)} className="text2">Send Writing</MDBBtn>
                  </center>
                </MDBCol>
             
            </MDBRow>




            <MDBCard className="mb-5 ">
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
