import React from 'react';
import { MDBContainer, MDBRow, MDBFormInline, MDBCol, MDBBtn } from 'mdbreact';
import './General.css';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie'
import axios from 'axios';

export default class FormPage extends React.Component {
  constructor(props) {
    super(props)
    Cookies.remove('search_context');
    Cookies.remove('search_type');
    Cookies.remove('search_exercise_type');
    Cookies.remove('search_exercise_language');
    Cookies.remove('search_exercise_level');
    axios.get('http://18.184.207.248/api/language/', { withCredentials: true })
      .then(res => {
        this.setState({ languages: res.data });
      })
    this.state = {
      isUser: true,
      isExercise: false,
      response: "",
      isSearched: false,
      languages: [],
      goToProfile: false
    }
    //this.onChangeOption = this.onChangeOption.bind(this);
  }

  onClickd() {

    var _type = ""

    if (this.state.isExercise) {
      _type = "exercise"
    } else {
      _type = "user"
    }

    Cookies.set('search_context', document.getElementById("search_text").value);
    Cookies.set('search_type', _type);



    this.setState({
      isSearched: true
    })

    // axios.get('http://18.184.207.248/api/search?text=' + Cookies.get('search_context') + '&type=' + Cookies.get('search_type'), { withCredentials: true })
    //   .then(res => {
    //     this.setState({
    //       response: res.data[0].username,
    //       isSearched:true
    //     })
    //   })




  }

  languageButtons() {
    var lang = [];
    for (let i = 0; i < this.state.languages.length; i++) {
      lang[i] = (
        <option value={this.state.languages[i].abbr} >{this.state.languages[i].name} </option>
      );
    }
    return lang;
  }
  fill_search_boxes() {
    var row = [];
    if (this.state.isUser) {
      row[0] = (
        <div>
          <input className="form-control mr-sm-2" type="text" placeholder="username" aria-label="Search" id="search_text" />
        </div>
      );
    }

    if (this.state.isExercise) {
      row[0] = (
        <div>
          <input className="form-control mr-sm-2" type="text" placeholder="exercise name" aria-label="Search" id="search_text" />
          <select className="browser-default custom-select" id="search_level" onClick={this.onChangeOption.bind(this)}>
            <option value="A1" >A1</option>
            <option value="A2">A2</option>
            <option value="B1">B1</option>
            <option value="B2">B2</option>
            <option value="C1">C1</option>
            <option value="C2">C2</option>
          </select>
          <select className="browser-default custom-select" id="search_language" onClick={this.onChangeOption.bind(this)}>
            {this.languageButtons()}
          </select>
          <select className="browser-default custom-select" id="search_type"  onClick={this.onChangeOption.bind(this)}>
            <option value="reading" >Reading</option>
            <option value="listening">Listening</option>
            <option value="grammer">Grammer</option>
            <option value="vocabulary">Vocabulary</option>
          </select>
        </div>
      )
    }

    return row;
  }




  onChangeOption(e) {
    /*if (e.detail === 0){
        alert(e.target.value);
    }*/
    if (e.target.id === "search_level") {
      Cookies.set('search_exercise_level', e.target.value)
    }
    if (e.target.id === "search_language") {
      Cookies.set('search_exercise_language',e.target.value);
    }
    if (e.target.id === "search_type") {
      Cookies.set('search_exercise_type',e.target.value);
    }

    if (e.target.value === "user") {
      this.setState({
        isUser: true,
        isExercise: false
      });
    };
    if (e.target.value === "exercise") {
      this.setState({
        isExercise: true,
        isUser: false
      });
    }
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
    /*if (this.state.goToProfile) {
      return (<Redirect
        push to={{
          pathname: "/user",
          state: {
            username : Cookies.get('search_context'),
          }
        }}
      />);
    }*/
    if (this.state.isSearched) {

      return (<Redirect
        push to={{
          pathname: "/searchResult"
        }}
      />);
    }

    return (
      <MDBContainer fluid>
        <MDBRow className="topMargined">
          <center><img className="backpicture" src=".\earth3.png" alt="." width="80%" /></center>
          <MDBCol md="8">
            <MDBFormInline >
              <select className="browser-default custom-select" onClick={this.onChangeOption.bind(this)}>
                <option value="user" >User</option>
                <option value="exercise">Exercise</option>
              </select>
              {this.fill_search_boxes()}


              <MDBBtn color="orange" size="sm" type="submit" className="mr-auto" onClick={this.onClickd.bind(this)}>
                Search
              </MDBBtn>
            </MDBFormInline>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
