import React from 'react';
import { Card, MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import './General.css';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'
import { TokenAnnotator, TextAnnotator } from 'react-text-annotate'
import { State, Toggle } from 'react-powerplug'


var content;
export default class FormPage extends React.Component {
  constructor(props) {
    super(props);    
    content = this.props.location._data;
    //http://18.184.207.248/api/annotation/?target_id=http://18.184.207.248/api/writing/213312
    axios.get('http://18.184.207.248/api/annotation/?target_source=http://18.184.207.248/api/writing/' + content.writing_id, { withCredentials: true })
            .then(res => {
                console.log(res.data.length);
                var temp_data = [];
                for (let i = 0; i < res.data.length; i++) {
                    var temp = res.data[i].target.selector.value.substring(5);
                    temp_data[i] = 
                         {
                            start: parseInt(temp.split(',')[0]),
                            end: parseInt(temp.split(',')[1]),
                            tag: res.data[i].body.value
                    }
                }
                this.setState({
                    text_anno_data:temp_data
                })                
            })
        this.state ={
            text_anno_data:[]
        }

  }
  myonFocus(element) {
    element.target.value = "";
  }
  textWriting() {
    console.log([this.state.text_anno_data]);
    
    var row = [];
    
    row[0] = (
      <div>
        <center> <div className="commentsec_title "> {content.title}  </div></center>
        <MDBRow>
          <br />
          <State initial={{ value: [this.state.text_anno_data], tag: '' }}>
            {({ state, setState }) => (
              <Card className="topMargined">

                <textarea onChange={e => setState({ tag: e.target.value })} onFocus={this.myonFocus.bind(this)}
                  class="form-control rounded-0" id="anno" rows="3" placeholder="annotation"></textarea>
                <div className="topMargined">
                  <TextAnnotator
                    style={{
                      maxWidth: 500,
                      lineHeight: 1.5,
                    }}
                    content={content.text}
                    value={state.value}
                    onChange={value => setState({ value })}
                    getSpan={span => ({
                      ...span,
                      tag: state.tag,
                      color: "yellow",
                      value: "",
                    })}
                  />
                </div>
              </Card>
            )}
          </State>
        </MDBRow>
      </div>

    );

    return row;
  }
  imageWriting() {
    var row = [];
        row[0] = (
            <div>
                <img className="topMargined marginedleft50" src={'http://18.184.207.248/'+content.image} alt="." />
                <div className="ExamBox"> {content.title} </div>

            </div>

        );

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
        '<li id="chld"><a href="/writingsList">My Writings</a></li>' +
        '<li id="chld"><a href="/writing">Send Writing</a></li>' +
        '<li id="chld"><a href="/messages">Messages</a></li>' +
        '<li id="chld" style="float:right";><a href="/Logout">Logout</a></li>' +
        '<li id="chld" style="float:right";><a href="/Settings" >Settings</a></li>' +
        '<li id="chld" style="float:right";><a href="/Search" >Search</a></li>');
    }
  }

  render() {
      console.log(this.state);

    if(content.image === null){
      return (
        <MDBContainer fluid>
          <MDBRow className="topMargined">
            <center><img className="backpicture" src=".\earth3.png" alt="." width="80%" /></center>
            <MDBCol>
              <div className="marginedleft20">
                <MDBRow>
                  <MDBCol>
                    <MDBRow><center>
                      {this.textWriting()}
                    </center></MDBRow>
                  </MDBCol>
                </MDBRow>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer >
      );
    }
    else{
      return (
        <MDBContainer fluid>
          <MDBRow className="topMargined">
            <center><img className="backpicture" src=".\earth3.png" alt="." width="80%" /></center>
            <MDBCol>
              <div className="marginedleft20">
                <MDBRow>
                  <MDBCol>
                    <MDBRow><center>
                      {this.imageWriting()}
                    </center></MDBRow>
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
