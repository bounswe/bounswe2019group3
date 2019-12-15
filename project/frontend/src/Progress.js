import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import './General.css';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'
var languageProgress = []
var exerciseProgress = []
export default class FormPage extends React.Component {
    constructor(props) {
        super(props);
        //api/language/
        axios.get('http://18.184.207.248/api/language', { withCredentials: true })
            .then(res => {
                //console.log(res.data)
                this.setState({
                    languages: res.data

                })                
                

                for (let index = 0; index < this.state.languages.length; index++) {
                    //console.log('http://18.184.207.248/api/user/' + Cookies.get('username') + '/language/' + this.state.languages[index].abbr + '/progress')
                    axios.get('http://18.184.207.248/api/user/' + Cookies.get('username') + '/language/' + this.state.languages[index].abbr + '/progress', { withCredentials: true })
                        .then(res => {
                            //console.log('here3')
                            //console.log(res.data)
                            languageProgress[index] = res.data;
                        }
                        )
                    //api/language/:language_abbr/exercise
                    //console.log('http://18.184.207.248/api/language/' + this.state.languages[index].abbr + '/exercise')
                    axios.get('http://18.184.207.248/api/language/' + this.state.languages[index].abbr + '/exercise', { withCredentials: true })
                        .then(res => {
                            //console.log(res.data);
                            var exercisesOfAbbr = res.data;
                            //console.log(exercisesOfAbbr);
                            for (let i = 0; i < exercisesOfAbbr.length; i++) {
                                //api/user/:username/exercise/:exercise_id/progress

                                //console.log('http://18.184.207.248/api/user/' + Cookies.get('username') + '/exercise/' + exercisesOfAbbr[i].exercise_id +'/progress')
                                axios.get('http://18.184.207.248/api/user/' + Cookies.get('username') + '/exercise/' + exercisesOfAbbr[i].exercise_id + '/progress', { withCredentials: true })
                                    .then(res => {
                                        //console.log(res.data)
                                        exerciseProgress[i] = res.data;
                                    })

                            }
                           


                        })
                    
                }


            })


        this.state = {
            languages: [],
            
            clicked: false,
            id: "",
            abbr: ""
        }

    }

    fill_languages_table() {
        var row = [];

        for (let i = 0; i < languageProgress.length; i++) {

            row[i] = (
                <tr >
                    <td className="Messagebox">{languageProgress[i].lang_abbr}</td>
                    <td className="Messagebox">{languageProgress[i].exercise_done}</td>
                    <td className="Messagebox">{languageProgress[i].exercises}</td>
                    <td className="Messagebox">{languageProgress[i].updatedAt}</td>

                </tr>
            );

        }
        return row;
    }
    fill_exercise_table() {
        
        console.log(exerciseProgress)
        var row = [];
        console.log(exerciseProgress.length)
        for (let i = 0; i < exerciseProgress.length; i++) {
            
            if (this.state.exerciseProg[i] !== undefined) {
                row[i] = (
                    <tr >
                        <td className="Messagebox">{exerciseProgress[i].exercise_id}</td>
                        <td className="Messagebox">{exerciseProgress[i].question_done}</td>
                        <td className="Messagebox">{exerciseProgress[i].questions}</td>
                        <td className="Messagebox">{exerciseProgress[i].updatedAt}</td>

                    </tr>
                );
            }
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
                '<li id="chld"><a href="/writing">Send Writing</a></li>' +
                '<li id="chld"><a href="/messages">Messages</a></li>' +
                '<li id="chld" style="float:right";><a href="/Logout">Logout</a></li>' +
                '<li id="chld" style="float:right";><a href="/Settings" >Settings</a></li>' +
                '<li id="chld" style="float:right";><a href="/Search" >Search</a></li>');
        }
    }

    render() {

              
        return (
            <MDBContainer fluid>
                <MDBRow className="topMargined">
                    <center><img className="backpicture" src=".\earth4.png" alt="." width="80%" /></center>
                    <MDBCol md="8">

                        <div className="marginedleft20">
                            <MDBRow>
                                <MDBCol md="6">
                                    <MDBRow>
                                        <table id="tablePreview" className="Messagebox">
                                            <thead>
                                                <tr>
                                                    <th className="Messagebox"><b>language</b></th>
                                                    <th className="Messagebox"><b>completed</b></th>
                                                    <th className="Messagebox"><b>total</b></th>
                                                    <th className="Messagebox"><b>last solved</b></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.fill_languages_table.bind(this)}
                                            </tbody>
                                        </table>
                                    </MDBRow>
                                    <MDBRow>
                                        <table id="tablePreview" className="Messagebox">
                                            <thead>
                                                <tr>
                                                    <th className="Messagebox"><b>exercise id</b></th>
                                                    <th className="Messagebox"><b>questions done</b></th>
                                                    <th className="Messagebox"><b>total questions</b></th>
                                                    <th className="Messagebox"><b>last solved</b></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.fill_exercise_table()}
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

