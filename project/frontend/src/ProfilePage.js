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
            <div > <p className="text-blue" > Welcome <i>{Cookies.get('username')}</i></p> </div>
            <div > <p className="text-blue" > Last exam taken language <i>{Cookies.get('selectedExamLanguage')}</i> </p> </div>
            <div > <p className="text-blue" > Grade <i>{Cookies.get('selectedExamGrade')}</i></p> </div>
            <div className="Bio"><p>Bio</p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in dictum leo. Vestibulum sed lacus ac tellus consectetur bibendum. Fusce ipsum dui, feugiat at eros in, auctor luctus tellus. Quisque at vehicula leo. Praesent vitae felis elementum, luctus libero dapibus, rhoncus ligula. Donec aliquam augue sed nunc suscipit consectetur. Integer sed sollicitudin ligula, vitae porta nisl. Vivamus dapibus diam cursus, porttitor ante ut, consequat est. </div>

          </div></MDBCol>
          <MDBCol md="3">
            <div className="Scrollbar topMargined">
              <div className="Comment">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in dictum leo. Vestibulum sed lacus ac tellus consectetur bibendum. Fusce ipsum dui, feugiat at eros in, auctor luctus tellus. Quisque at vehicula leo. Praesent vitae felis elementum, luctus libero dapibus, rhoncus ligula. Donec aliquam augue sed nunc suscipit consectetur. Integer sed sollicitudin ligula, vitae porta nisl. Vivamus dapibus diam cursus, porttitor ante ut, consequat est. </div>
              <div className="Comment">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in dictum leo. Vestibulum sed lacus ac tellus consectetur bibendum. Fusce ipsum dui, feugiat at eros in, auctor luctus tellus. Quisque at vehicula leo. Praesent vitae felis elementum, luctus libero dapibus, rhoncus ligula. Donec aliquam augue sed nunc suscipit consectetur. Integer sed sollicitudin ligula, vitae porta nisl. Vivamus dapibus diam cursus, porttitor ante ut, consequat est. </div>
              <div className="Comment">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in dictum leo. Vestibulum sed lacus ac tellus consectetur bibendum. Fusce ipsum dui, feugiat at eros in, auctor luctus tellus. Quisque at vehicula leo. Praesent vitae felis elementum, luctus libero dapibus, rhoncus ligula. Donec aliquam augue sed nunc suscipit consectetur. Integer sed sollicitudin ligula, vitae porta nisl. Vivamus dapibus diam cursus, porttitor ante ut, consequat est. </div>
              <div className="Comment">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in dictum leo. Vestibulum sed lacus ac tellus consectetur bibendum. Fusce ipsum dui, feugiat at eros in, auctor luctus tellus. Quisque at vehicula leo. Praesent vitae felis elementum, luctus libero dapibus, rhoncus ligula. Donec aliquam augue sed nunc suscipit consectetur. Integer sed sollicitudin ligula, vitae porta nisl. Vivamus dapibus diam cursus, porttitor ante ut, consequat est. </div>
              <div className="Comment">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in dictum leo. Vestibulum sed lacus ac tellus consectetur bibendum. Fusce ipsum dui, feugiat at eros in, auctor luctus tellus. Quisque at vehicula leo. Praesent vitae felis elementum, luctus libero dapibus, rhoncus ligula. Donec aliquam augue sed nunc suscipit consectetur. Integer sed sollicitudin ligula, vitae porta nisl. Vivamus dapibus diam cursus, porttitor ante ut, consequat est. </div>

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
