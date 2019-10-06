import React from "react";
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardHeader, MDBBtnGroup } from 'mdbreact';
import './SignUp.css';
import { Radar } from 'react-chartjs-2';


export default class FormPage extends React.Component {
    
    state = {
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
    render() {
        function goToExercises() {
          }
          function goToSendWriting() {
          }
        return (

            <MDBContainer fluid>
                <MDBRow className="header"><img src=".\header.png" alt="." width="100%" />
                    <MDBCol md="10"></MDBCol>
                    <MDBCol md="2">
                        <img className="profilePic" src=".\profilePicture.png" alt="." width="50%" />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <center><img className="backpicture" src=".\earth3.png" alt="." width="80%" /></center>
                    <MDBCol md="3"><div className="Scrollbar topMargined">
                        <div className="Status"> Accepts writing exercises </div>
                        <div className="Bio"><p>Bio</p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in dictum leo. Vestibulum sed lacus ac tellus consectetur bibendum. Fusce ipsum dui, feugiat at eros in, auctor luctus tellus. Quisque at vehicula leo. Praesent vitae felis elementum, luctus libero dapibus, rhoncus ligula. Donec aliquam augue sed nunc suscipit consectetur. Integer sed sollicitudin ligula, vitae porta nisl. Vivamus dapibus diam cursus, porttitor ante ut, consequat est. </div>

                    </div></MDBCol>
                    <MDBCol md="4">
                        <div className="Scrollbar topMargined">
                            <div className="Comment">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in dictum leo. Vestibulum sed lacus ac tellus consectetur bibendum. Fusce ipsum dui, feugiat at eros in, auctor luctus tellus. Quisque at vehicula leo. Praesent vitae felis elementum, luctus libero dapibus, rhoncus ligula. Donec aliquam augue sed nunc suscipit consectetur. Integer sed sollicitudin ligula, vitae porta nisl. Vivamus dapibus diam cursus, porttitor ante ut, consequat est. </div>
                            <div className="Comment">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in dictum leo. Vestibulum sed lacus ac tellus consectetur bibendum. Fusce ipsum dui, feugiat at eros in, auctor luctus tellus. Quisque at vehicula leo. Praesent vitae felis elementum, luctus libero dapibus, rhoncus ligula. Donec aliquam augue sed nunc suscipit consectetur. Integer sed sollicitudin ligula, vitae porta nisl. Vivamus dapibus diam cursus, porttitor ante ut, consequat est. </div>
                            <div className="Comment">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in dictum leo. Vestibulum sed lacus ac tellus consectetur bibendum. Fusce ipsum dui, feugiat at eros in, auctor luctus tellus. Quisque at vehicula leo. Praesent vitae felis elementum, luctus libero dapibus, rhoncus ligula. Donec aliquam augue sed nunc suscipit consectetur. Integer sed sollicitudin ligula, vitae porta nisl. Vivamus dapibus diam cursus, porttitor ante ut, consequat est. </div>
                            <div className="Comment">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in dictum leo. Vestibulum sed lacus ac tellus consectetur bibendum. Fusce ipsum dui, feugiat at eros in, auctor luctus tellus. Quisque at vehicula leo. Praesent vitae felis elementum, luctus libero dapibus, rhoncus ligula. Donec aliquam augue sed nunc suscipit consectetur. Integer sed sollicitudin ligula, vitae porta nisl. Vivamus dapibus diam cursus, porttitor ante ut, consequat est. </div>
                            <div className="Comment">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in dictum leo. Vestibulum sed lacus ac tellus consectetur bibendum. Fusce ipsum dui, feugiat at eros in, auctor luctus tellus. Quisque at vehicula leo. Praesent vitae felis elementum, luctus libero dapibus, rhoncus ligula. Donec aliquam augue sed nunc suscipit consectetur. Integer sed sollicitudin ligula, vitae porta nisl. Vivamus dapibus diam cursus, porttitor ante ut, consequat est. </div>

                        </div>
                    </MDBCol>
                    <MDBCol md="5">
                        <center><div class="btn-group topMargined" role="group" aria-label="Basic example">
                        <MDBBtn color="orange" onClick={goToExercises} className="text2">Exercises</MDBBtn>
                        <MDBBtn color="orange" onClick={goToSendWriting} className="text2">Send Writing</MDBBtn>
                        </div></center>
                        <MDBCard className="mb-5 topMargined">
                            <MDBCardHeader>Language levels</MDBCardHeader>
                            <MDBCardBody>
                            <Radar data={this.state.dataRadar} options={{ responsive: true }} /></MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}
