import React from 'react';
import { MDBContainer, MDBRow, MDBCol,MDBFormInline, MDBBtn, MDBIcon } from 'mdbreact';
import './General.css';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie'
import axios from 'axios';

export default class ExaminationPage extends React.Component {
  constructor(props) {
    super(props);
    axios.get('http://18.184.207.248/api/language/', { withCredentials: true })
    .then(res => {
      this.setState({ languages: res.data });
    })
     axios.get('http://18.184.207.248/api/user', {withCredentials: true})
        .then(res => {
            this.setState({
              assignees:res.data
            })
        }) 
    this.state = {
      isSended: false,
      isLogout: false,
      assignees:[],
      languages:[]
    }
  }
  onClickd() { 
    const frm = {
      title: document.getElementById("title").value,
      text: document.getElementById("text").value,
      lang_abbr: document.getElementById("abbr").value,
      assignee: document.getElementById("assignee").value
    }
    console.log(frm);


    
    this.setState({
      isSended: true
    });
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
        '<li id="chld" style="float:right";><a href="/Logout">Logout</a></li>'+
        '<li id="chld" style="float:right";><a href="/Settings" >Settings</a></li>' +
        '<li id="chld" style="float:right";><a href="/Search" >Search</a></li>');
    }
  }

  onChangeOption(e) {
    console.log(e.target.value);
    if (e.target.id === "assignee") {
      Cookies.set('selected_writing_assignee', e.target.value);
    }else if(e.target.id === "abbr"){
      Cookies.set('selected_writing_abbr', e.target.value)
    }
  }

  fill_assignees() {
    var assignee = [];
    for (let i = 0; i < this.state.assignees.length; i++) {
      assignee[i] = (
        <option id="assignee" value={this.state.assignees[i].username} >{this.state.assignees[i].username} </option>
      );
    }
    return assignee;
  }


  fill_language() {
    var lang = [];
    for (let i = 0; i < this.state.languages.length; i++) {
      lang[i] = (
        <option value={this.state.languages[i].abbr} >{this.state.languages[i].name} </option>
      );
    }
    return lang;
  }
  
  render() {

    // if(this.state.isSended) {
    //   return (<Redirect
    //     push to={{
    //       pathname: "/profile"
    //     }}
    //   />);
    // }

    

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
                id="title"
              />
              <br />
              <label
                className="grey-text"
              >
                Your Writing
            </label>
              <textarea
                type="text"
                className="form-control"
                rows="10"
                id="text"
              /><br />
              <MDBFormInline >
              <select className="browser-default custom-select" id="abbr" onClick={this.onChangeOption.bind(this)}>
                {this.fill_language()}
              </select>
              <select className="browser-default custom-select" id="assignee" onClick={this.onChangeOption.bind(this)}>
                {this.fill_assignees()}
              </select>
              </MDBFormInline>

              <div className="mt-4">
                <MDBBtn color="orange" onClick={this.onClickd.bind(this)} background type="submit">
                  SEND
                <MDBIcon far icon="paper-plane" className="ml-2" />
                </MDBBtn>
              </div>
            </form>
          </MDBCol>
          <MDBCol md="2"></MDBCol>

        </MDBRow>
      </MDBContainer>
    );
  }
}
