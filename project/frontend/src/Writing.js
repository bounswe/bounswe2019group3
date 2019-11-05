import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn,MDBIcon, MDBInput } from 'mdbreact';
import './SignUp.css';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'

export default class ExaminationPage extends React.Component {
    constructor(props) {
        super(props);
        /* axios.get('http://18.184.207.248/api/', {withCredentials: true})
            .then(res => {
                
            }) */
        this.state = {

            isLogout: false
        }
    }
    onClickd() { }

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

        return (
            <MDBContainer fluid>

                <MDBRow className="topMargined">
                    <center><img className="backpicture" src=".\earth3.png" alt="." width="80%" /></center>
                    <MDBCol md="2"></MDBCol>
                    <MDBCol md="8">
                    <form>
            
           
            <label
              className="grey-text"
            >
              Title
            </label>
            <input
              type="text"
              className="form-control"
            />
            <br />
            <label
              className="grey-text"
            >
              Your Writing
            </label>
            <textarea
              type="text"
              className="form-control "
              rows="10"
            /><br/>
            <label
              className="grey-text"
            >
              Send To
            </label>
            <input
              type="text"
              className="form-control"
            />
            <div className="mt-4">
              <MDBBtn color="orange" onClick={this.onLogout.bind(this)} background type="submit">
                SEND
                <MDBIcon far icon="paper-plane" className="ml-2" />
              </MDBBtn>
            </div>
          </form>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>

                </MDBRow>
                <MDBRow>
                <MDBCol md="8"></MDBCol>
                    <MDBCol md="2" ><div className = "topMargined10"><MDBBtn color="orange"  onClick={this.onLogout.bind(this)} className="text2">Logout</MDBBtn></div>
                        
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}
