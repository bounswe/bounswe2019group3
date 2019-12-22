import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import './General.css';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'

export default class FormPage extends React.Component {
  constructor(props) {
    super(props);

    axios.get('http://18.184.207.248/api/user/' + Cookies.get('username') + '/writings', { withCredentials: true })
      .then(res => {
        //console.log(res.data);
        this.setState({ writings: res.data });
        console.log(this.state.writings);
      })

    this.state = {
        writings:[],
        is_go_selected_writing:false,
        selected_id:0,
        content : ""

    }
  }

  fill_writing_table_head() {
    var first_line = [];
    
      first_line[0] = (
        <tr>
          <th className="Messagebox"><b>result #</b></th>
          <th className="Messagebox"><b>title</b></th>
          <th className="Messagebox"><b>writing_id </b></th>
          <th className="Messagebox"><b>written_by </b></th>
          <th className="Messagebox"><b>assignee </b></th>
        </tr>
      )

    return first_line;
  }

  go_selected_writing(id,text){
    this.setState({
        is_go_selected_writing:true,
        selected_id:id,
        content: text
    })
  }


  fill_writing_table() {
    var row = [];
      for (let i = 0; i < this.state.writings.length; i++) {
        row[i] = (
          <tr >
            <td className="Messagebox" scope="row">{i + 1}</td>
            <td className="Messagebox clickable" onClick={this.go_selected_writing.bind(this, this.state.writings[i].writing_id, this.state.writings[i].text)}>
              {this.state.writings[i].title}
            </td>
            <td className="Messagebox" >
              {this.state.writings[i].writing_id}
            </td>
            <td className="Messagebox" >
              {this.state.writings[i].written_by}
            </td>
            <td className="Messagebox" >
              {this.state.writings[i].assignee}
            </td>
          </tr>
        );
      }
    

    return row;
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
        '<li id="chld"><a href="/writingsList">My Writings</a></li>'+
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
    console.log(this.props);
    if(this.state.is_go_selected_writing){
      return (<Redirect
        to={{
          pathname: "/writings" ,
          _data : this.state.content
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
                        {this.fill_writing_table_head()}
                      </thead>
                      <tbody>
                        {this.fill_writing_table()}
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
