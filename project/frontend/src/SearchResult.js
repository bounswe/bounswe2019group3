import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import './General.css';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'

export default class FormPage extends React.Component {
  constructor(props) {
    super(props);


    if (Cookies.get('search_type') === "user") {
      axios.get('http://localhost:3000/api/search?text=' + Cookies.get('search_context') + '&type=' + Cookies.get('search_type'), { withCredentials: true })
        .then(res => {
          console.log(res.data)
          this.setState({
            response: res.data
          })
        })
    } else {

      var result = "";
      if (Cookies.get('search_type')) {
        result += '&type=' + Cookies.get('search_type');
      }
      if (Cookies.get('search_exercise_language')) {
        result += '&lang_abbr=' + Cookies.get('search_exercise_language');
      }
      if (Cookies.get('search_exercise_level')) {
        result += '&level=' + Cookies.get('search_exercise_level');
      }
      if (Cookies.get('search_exercise_type')) {
        result += '&exercise_type=' + Cookies.get('search_exercise_type');
      }

      axios.get('http://localhost:3000/api/search?text=' + Cookies.get('search_context') +
        result, { withCredentials: true })
        .then(res => {
          console.log(res.data)
          this.setState({
            response: res.data
          })
        })


    }

    this.state = {
      is_myself: false,
      choosed_person: "",
      is_go_user_profile: false,
      is_go_exercise_page: false,
      searched_type: Cookies.get('search_type'),
      response: [],
      goToProfile: false
    }
    //this.onChangeOption = this.onChangeOption.bind(this);
  }

  fill_search_table_head() {
    var first_line = [];
    if (this.state.searched_type === "user") {
      first_line[0] = (
        <tr>
          <th className="Messagebox"><b>result #</b></th>
          <th className="Messagebox">
            <b>{this.state.searched_type}</b>
          </th>
        </tr>
      )
    }
    else {
      first_line[0] = (
        <tr>
          <th className="Messagebox"><b>result #</b></th>
          <th className="Messagebox"><b>title</b></th>
          <th className="Messagebox"><b>exercise_id </b></th>
          <th className="Messagebox"><b>language </b></th>
          <th className="Messagebox"><b>type </b></th>
          <th className="Messagebox"><b>level </b></th>
        </tr>
      )
    }

    return first_line;
  }

  fill_search_table() {
    var row = [];
    if (this.state.searched_type === "user") {
      for (let i = 0; i < this.state.response.length; i++) {
        row[i] = (
          <tr >
            <td className="Messagebox" scope="row">{i + 1}</td>
            <td className="Messagebox clickable" onClick={this.go_user_profile.bind(this, this.state.response[i].username)}>
              {this.state.response[i].username}
            </td>
          </tr>
        );
      }
    } else {  // if searched type is excersise 
      for (let i = 0; i < this.state.response.length; i++) {
        row[i] = (
          <tr >
            <td className="Messagebox" scope="row">{i + 1}</td>
            <td className="Messagebox clickable" onClick={this.go_exercise_page.bind(this, this.state.response[i].exercise_id, this.state.response[i].lang_abbr, this.state.response[i].exercise_type)}>
              {this.state.response[i].title}
            </td>
            <td className="Messagebox" >
              {this.state.response[i].exercise_id}
            </td>
            <td className="Messagebox" >
              {this.state.response[i].lang_abbr}
            </td>
            <td className="Messagebox" >
              {this.state.response[i].exercise_type}
            </td>
            <td className="Messagebox" >
              {this.state.response[i].level}
            </td>
          </tr>
        );
      }
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

  go_exercise_page(exercise_id, abbr,type) {
    Cookies.set('selectedLanguageAbbr', abbr);
    Cookies.set('selectedExerciseId', exercise_id);
    Cookies.set('selectedType', type);
    this.setState({
      is_go_exercise_page: true
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
        '<li id="chld"><a href="/sendexercise">Send Exercise</a></li>' +
        '<li id="chld"><a href="/exam">Exam</a></li>' +
        '<li id="chld"><a href="/writingsList">My Writings</a></li>' +
        '<li id="chld"><a href="/writing">Send Writing</a></li>' +
        '<li id="chld"><a href="/messages">Messages</a></li>' +
        '<li id="chld" style="float:right";><a href="/Logout">Logout</a></li>' +
        '<li id="chld" style="float:right";><a href="/Settings" >Settings</a></li>' +
        '<li id="chld" style="float:right";><a href="/Search" >Search</a></li>');
    }
  }

  render() {
    /*if (this.state.goToProfile) {
      return (<Redirect
        push to={{
          pathname: "/user",
          data_: this.state.choosed_person
        }}
      />);
    }*/
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

    if (this.state.is_go_exercise_page) {
      return (<Redirect
        to={{
          pathname: "/exercise",
        }}
      />);
    }

    return (
      <MDBContainer fluid>
        <MDBRow className="topMargined">
          <center><img className="backpicture" src=".\earth3.png" alt="." width="80%" /></center>
          <MDBCol md="8">

            <div className="marginedleft20">
              <MDBRow>
                <MDBCol md="6">
                  <MDBRow>
                    <table id="tablePreview" className="Messagebox">
                      <thead>
                        {this.fill_search_table_head()}
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
