import React from 'react';
import { MDBContainer, MDBRow, MDBFormInline, MDBCol, MDBBtn } from 'mdbreact';
import './General.css';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie'

export default class FormPage extends React.Component {
  constructor(props) {
    super(props)
    Cookies.remove('search_context');
    Cookies.remove('search_type' );
    this.state = {
      isUser: false,
      isExercise: false,
      response: "",
      isSearched: false,
      goToProfile : false
    }
    //this.onChangeOption = this.onChangeOption.bind(this);
  }

  onClickd() {

    var _type = ""

    if (this.state.isExercise) {
      _type = "exercise"
    }else{
      _type = "user"
    }

    const frm = {
      text: document.getElementById("search").value,
      type: _type
    };

    Cookies.set('search_context', frm.text);
    Cookies.set('search_type', frm.type);

    this.setState({
      isSearched:true
    })

    // axios.get('http://18.184.207.248/api/search?text=' + Cookies.get('search_context') + '&type=' + Cookies.get('search_type'), { withCredentials: true })
    //   .then(res => {
    //     this.setState({
    //       response: res.data[0].username,
    //       isSearched:true
    //     })
    //   })




  }

  onChangeOption(e) {
    /*if (e.detail === 0){
        alert(e.target.value);
    }*/
    if (e.target.value === 1) {
      this.setState({
        isUser: true,
        isExercise: false
      });
    };
    if (e.target.value === 2) {
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
      var type = "";
      if(this.state.isUser){
        type = "user"
      } else {
        type = "Exercise"
      }
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
              <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" id="search" />
              <select className="browser-default custom-select" onClick={this.onChangeOption.bind(this)}>
                <option selected>Select search type</option>
                <option value="1" >User</option>
                <option value="2">Exercise</option>

              </select>
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
