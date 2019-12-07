import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import './General.css';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'

export default class FormPage extends React.Component {
  constructor(props) {
    super(props);

    axios.get('http://18.184.207.248/api/language/' + Cookies.get('selectedLanguageAbbr') + '/exercise', { withCredentials: true })
      .then(res => {
        console.log(res.data)
        this.setState({
          response: res.data
        })
      })
    this.state = {   
      response: [],      
      clicked: false,
      id: "",
      abbr:""
    }
    
  }

  fill_search_table() {
    var row = [];
    
      for (let i = 0; i < this.state.response.length; i++) {
        row[i] = (
          <tr >
            <td className="Messagebox">{this.state.response[i].exercise_id}</td>
            <td className="Messagebox clickable" onClick={this.go_exercise.bind(this, this.state.response[i].exercise_id, this.state.response[i].lang_abbr)}>{this.state.response[i].title}</td>
            <td className="Messagebox">{this.state.response[i].exercise_type}</td>
            <td className="Messagebox">{this.state.response[i].level}</td>
            <td className="Messagebox">{this.state.response[i].tags}</td>
          </tr>
        );
      }   
    return row;
  }

  go_exercise(id,abbr){
    console.log(id +""+ abbr);
    Cookies.set('selectedExerciseId', id);
    Cookies.set('selectedLanguageAbbr', abbr);
    this.setState({clicked: true});
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
    if(this.state.clicked){      
        return (<Redirect
            push to={{
                pathname: "/exercise",
                                   
            }}
        />);
    
    }
    else{
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
                          <tr>
                            <th className ="Messagebox"><b>id</b></th>
                            <th className="Messagebox"><b>title</b></th>
                            <th className="Messagebox"><b>type</b></th>
                            <th className="Messagebox"><b>level</b></th>
                            <th className="Messagebox"><b>tags</b></th>
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
}
