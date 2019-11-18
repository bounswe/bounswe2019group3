import React from 'react';
import { MDBContainer, MDBRow, MDBFormInline, MDBCol, MDBBtn, MDBIcon } from 'mdbreact';
import './General.css';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'

export default class FormPage extends React.Component {
  constructor(props) {
    super(props);

    axios.get('http://18.184.207.248/api/search?text=' + Cookies.get('search_context') + '&type=' + Cookies.get('search_type'), { withCredentials: true }  )
    .then(res => {
      this.setState({
        response: res.data[0].username
      })
    })

    this.state = {
      response : ""
    }
    //this.onChangeOption = this.onChangeOption.bind(this);
  }

  
  componentDidMount() {
    var _navbar = document.getElementById("nav");
    if (_navbar.childNodes.length > 2) {
      return;
    } else {
      _navbar.removeChild(_navbar.childNodes[0]);
      var _nav = document.getElementById("last_item");
      _nav.insertAdjacentHTML('beforebegin',
        '<li id="chld"><a href="/profile">Profile</a></li>');
      _nav.insertAdjacentHTML('afterend',
        '<li id="chld"><a href="/exam">Exam</a></li>' +
        '<li id="chld"><a href="/writing">Send Writing</a></li>' +
        '<li id="chld"><a href="/messages">Messages</a></li>' +
        '<li id="chld" style="float:right";><a href="/Logout">Logout</a></li>' +
        '<li id="chld" style="float:right";><a href="/Settings" >Settings</a></li>');
    }
  }

  render() {
    

    return (
      <MDBContainer fluid>
        <MDBRow className="topMargined">
          <center><img className="backpicture" src=".\earth3.png" alt="." width="80%" /></center>
          <MDBCol md="8">
            <MDBFormInline >
              <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" id="search" />
              <select className="browser-default custom-select" onClick={this.onChangeOption.bind(this)}>
                <option selected>Select search type</option>
                <option value="1" >User</option>
                <option value="2">Exercise</option>

              </select>
              <MDBBtn color="orange"  size="sm" type="submit" className="mr-auto" onClick={this.onClickd.bind(this)}>
                Search
          </MDBBtn>

            </MDBFormInline>
            <div className="marginedleft20">
              <MDBRow>
                <MDBCol md="6">
                  <MDBRow>
                    <table id="tablePreview" className="table">

                      <thead>
                        <tr>
                          <th>#</th>
                          {this.state.isUser ?
                            <th>Usename</th>
                            : <th>Exercise</th>
                          }

                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>Mark</td>

                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>Jacob</td>

                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>Larry</td>

                        </tr>
                      </tbody>
                    </table>
                  </MDBRow>
                </MDBCol>
              </MDBRow>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
