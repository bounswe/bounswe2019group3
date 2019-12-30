import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBFormInline, MDBBtn, MDBIcon } from 'mdbreact';
import './General.css';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie'
import axios from 'axios';

export default class ExaminationPage extends React.Component {
  constructor(props) {
    super(props);
    Cookies.remove('selected_writing_abbr');
    Cookies.remove('selected_writing_assignee');
    axios.get('http://18.184.207.248/api/language/', { withCredentials: true })
      .then(res => {
        this.setState({ languages: res.data });
      })

    this.state = {
      isSended: false,
      selectedFile: undefined,
      assignees: [],
      languages: [],
      image: undefined,
      isWriteEssay: true,
      isUploadfile: false
    }
  }


  onClickd() {
    console.log(this.state);



    if (this.state.isUploadfile) {
      const data = new FormData();
      data.append("image", this.state.image);
      data.append("lang_abbr", document.getElementById("abbr").value);
      data.append("assignee", document.getElementById("assignee").value);
      data.append("title", "Hand-Written");
      axios.post(('http://18.184.207.248/api/writing'),
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }).then((res) => {
          if (res.status === 204) {
            console.log(res);
            this.setState({
              isSended: true
            });
          }
        });
    } else {
      const frm = {
        title: document.getElementById("title").value,
        text: document.getElementById("text").value,
        lang_abbr: document.getElementById("abbr").value,
        assignee: document.getElementById("assignee").value
      }
      axios.post('http://18.184.207.248/api/writing', frm, { withCredentials: true })
        .then(res => {
          if (res.status === 204) {
            console.log(res);
            this.setState({
              isSended: true
            });
          }
        }).catch(error => {
          alert("invalid information")
        });
    }




    Cookies.remove('selected_writing_abbr');
    Cookies.remove('selected_writing_assignee');

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

  onChangeOption(e) {
    if (e.target.id === "assignee") {
      Cookies.set('selected_writing_assignee', e.target.value);

    }
    if (e.target.id === "abbr") {
      Cookies.set('selected_writing_abbr', e.target.value);
      axios.get('http://18.184.207.248/api/language/' + Cookies.get('selected_writing_abbr') + '/recommendation', { withCredentials: true })
        .then(res => {
          this.setState({
            assignees: res.data
          })
        });
    }
    if (e.target.value === "write") {
      this.setState({
        isWriteEssay: true,
        isUploadfile: false
      })
    }
    if (e.target.value === "upload") {
      this.setState({
        isWriteEssay: false,
        isUploadfile: true
      })
    }


  }
  fill_assignees() {
    var assignee = [];
    for (let i = 0; i < this.state.assignees.length; i++) {
      if (Cookies.get('username') !== this.state.assignees[i].username) {
        assignee[i] = (
          <option id="assignee" value={this.state.assignees[i].username} >{this.state.assignees[i].username}   (Rating:{this.state.assignees[i].rating},Grade:{this.state.assignees[i].grade}) </option>
        );
      }
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

  handleFileupload(ev) {
    this.setState({
      image: ev.target.files[0]
    });
  }

  fill_page() {
    var page = [];
    if (this.state.isWriteEssay) {
      page[0] = (
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

          <br />
          <br />
          <label
            className="grey-text"
          >
            Language and Assignee
            </label>
          <MDBFormInline >
            <select className="browser-default custom-select" id="abbr" onClick={this.onChangeOption.bind(this)}>
              {this.fill_language()}
            </select>
            <select className="browser-default custom-select" id="assignee" onClick={this.onChangeOption.bind(this)}>
              {this.fill_assignees()}
            </select>
          </MDBFormInline>

          <div className="mt-4">
            <MDBBtn color="orange" onClick={this.onClickd.bind(this)} background >
              SEND
                <MDBIcon far icon="paper-plane" className="ml-2" />
            </MDBBtn>
          </div>
        </form>
      )


    } else if (this.state.isUploadfile) {
      page[0] = (
        <form>
          <label
            className="grey-text"
          >
            Your Hand Writing
            </label>
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              onChange={this.handleFileupload.bind(this)}
              id="file"

            />
            <label
              className="custom-file-label"
              htmlFor="validatedCustomFile"
            >
              Choose Image...
                </label>
            <br />
          </div>

          <br />
          <br />
          <label
            className="grey-text"
          >
            Language and Assignee
            </label>
          <MDBFormInline >
            <select className="browser-default custom-select" id="abbr" onClick={this.onChangeOption.bind(this)}>
              {this.fill_language()}
            </select>
            <select className="browser-default custom-select" id="assignee" onClick={this.onChangeOption.bind(this)}>
              {this.fill_assignees()}
            </select>
          </MDBFormInline>

          <div className="mt-4">
            <MDBBtn color="orange" onClick={this.onClickd.bind(this)} >
              SEND
                <MDBIcon far icon="paper-plane" className="ml-2" />
            </MDBBtn>
          </div>
        </form>
      )
    }
    return page;
  }

  render() {

    if (this.state.isSended) {
      return (<Redirect
        push to={{
          pathname: "/writingsList"
        }}
      />);
    }

    return (
      <MDBContainer fluid>

        <MDBRow className="topMargined">
          <center><img className="backpicture" src=".\earth3.png" alt="." width="80%" /></center>
          <MDBCol md="2"></MDBCol>
          <MDBCol md="8">
            <select className="browser-default custom-select" onClick={this.onChangeOption.bind(this)}>
              <option value="write" >Write Essay</option>
              <option value="upload">Upload Essay</option>
            </select>
            <br />
            <br />
            {this.fill_page()}
          </MDBCol>
          <MDBCol md="2"></MDBCol>

        </MDBRow>
      </MDBContainer>
    );
  }
}
