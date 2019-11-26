import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import './General.css';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'

export default class FormPage extends React.Component {
  constructor(props) {
    super(props);

    axios.get('http://18.184.207.248/api/search?text=' + Cookies.get('search_context') + '&type=' + Cookies.get('search_type'), { withCredentials: true })
      .then(res => {
        console.log(res.data)
        this.setState({
          response: res.data
        })
      })

    this.state = {
      is_myself: false,
      choosed_person: "",
      is_go_user_profile: false,
      searched_type: Cookies.get('search_type'),
      response: []
    }
    //this.onChangeOption = this.onChangeOption.bind(this);
  }

  fill_search_table() {
    var row = [];
    if (this.state.searched_type === "user") {
      for (let i = 0; i < this.state.response.length; i++) {
        row[i] = (
          <tr >
            <td className="Messagebox" scope="row">{i + 1}</td>
            <td className="Messagebox" onClick={this.go_user_profile.bind(this, this.state.response[i].username)}>
              {this.state.response[i].username}
            </td>
          </tr>
        );
      }
    } else {  // if searched type is excersise 

    }

    return row;
  }

  go_user_profile(person) {
    if (person === Cookies.get('username')) {
      this.setState({
        is_myself: true
      })
    }
    this.setState({
      choosed_person: person,
      is_go_user_profile: true
    })
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
        '<li id="chld" style="float:right";><a href="/Settings" >Settings</a></li>' +
        '<li id="chld" style="float:right";><a href="/Search" >Search</a></li>');
    }
  }

  render() {

    if (this.state.is_go_user_profile) {
      if (this.state.is_myself) {
        return (<Redirect
          to={{
            pathname: "/profile"
          }}
        />);
      }
      return (<Redirect
        to={{
          pathname: "/user",
          data_: this.state.choosed_person
        }}
      />);
    }

    console.log(this.state)
    return (
      <MDBContainer fluid>
        <MDBRow className="topMargined">
          <center><img className="backpicture" src=".\earth3.png" alt="." width="80%" /></center>
          <MDBCol md="8">

            <div className="marginedleft20">
              <MDBRow>
                <MDBCol md="6">
                  <MDBRow>
                    <table id="tablePreview" className="table">
                      <thead>
                        <tr>
                          <th className = "Messagebox"><b>result #</b></th>
                          <th className="Messagebox">
                            <b>{this.state.searched_type}</b>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.fill_search_table()}
                      </tbody>
                    </table>
                  </MDBRow>
                </MDBCol>
              </MDBRow>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer >
    );
  }
}
