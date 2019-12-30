import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import './General.css';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'
var languageProgress;
var exerciseProgress;
var languages
export default class FormPage extends React.Component {
    constructor(props) {
        super(props);
        languageProgress = []
        exerciseProgress = []
        languages = []
        //api/language/
        axios.get('http://18.184.207.248/api/language', { withCredentials: true })
            .then(res => {
                //console.log(res.data)
                languages = res.data
                this.setState({                                        
                    lang : languages,  
                                                          
                })       
                for (let index = 0; index < languages.length; index++) {
                    //console.log('http://18.184.207.248/api/user/' + Cookies.get('username') + '/language/' + this.state.languages[index].abbr + '/progress')
                    axios.get('http://18.184.207.248/api/user/' + Cookies.get('username') + '/language/' + languages[index].abbr + '/progress', { withCredentials: true })
                        .then(res => {
                            //console.log('here3')
                            //console.log(res.data)
                            languageProgress[index] = res.data;
                        }
                        )
                    //api/language/:language_abbr/exercise
                    //console.log('http://18.184.207.248/api/language/' + this.state.languages[index].abbr + '/exercise')
                    axios.get('http://18.184.207.248/api/language/' + languages[index].abbr + '/exercise', { withCredentials: true })
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
                                        this.setState({                                        
                                            exerciseProg : exerciseProgress,  
                                                                                  
                                        }) 
                                    }) 
                                    this.setState({                                        
                                        languageProg : languageProgress,  
                                                                              
                                    })     
                                                                    
                            }                               
                        })                    
                } 
                
                               
            })            
        this.state = {
            lang: [],
            languageProg : [],
            exerciseProg : [],
            clicked: false,
            id: "",
            abbr: ""
        }
        

    }

    fill_languages_table() {
        var row = [];
        
        for (let i = 0; i < this.state.languageProg.length; i++) {

            row[i] = (
                <tr >
                    <td className="Messagebox">{this.state.languageProg[i].lang_abbr}</td>
                    <td className="Messagebox">{this.state.languageProg[i].exercise_done}</td>
                    <td className="Messagebox">{this.state.languageProg[i].exercises}</td>
                    <td className="Messagebox">{this.state.languageProg[i].updatedAt}</td>

                </tr>
            );

        }
        return row;
    }
    fill_exercise_table() {
        
        //console.log(exerciseProgress)
        var row = [];
        //console.log(exerciseProgress.length)
        for (let i = 0; i < this.state.exerciseProg.length; i++) {
            
            if (this.state.exerciseProg[i] !== undefined) {
                row[i] = (
                    <tr >
                        <td className="Messagebox">{this.state.exerciseProg[i].exercise_id}</td>
                        <td className="Messagebox">{this.state.exerciseProg[i].question_done}</td>
                        <td className="Messagebox">{this.state.exerciseProg[i].questions}</td>
                        <td className="Messagebox">{this.state.exerciseProg[i].updatedAt}</td>

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
                '<li id="chld"><a href="/sendexercise">Send Exercise</a></li>' +
                '<li id="chld"><a href="/progress">Progress</a></li>'+
                '<li id="chld"><a href="/exam">Exam</a></li>' +
                '<li id="chld"><a href="/writingsList">My Writings</a></li>' +
                '<li id="chld"><a href="/writing">Send Writing</a></li>' +
                '<li id="chld"><a href="/messages">Messages</a></li>' +
                '<li id="chld" style="float:right";><a href="/Logout">Logout</a></li>' +
                '<li id="chld" style="float:right";><a href="/Settings">Settings</a></li>' +
                '<li id="chld" style="float:right";><a href="/Search" >Search</a></li>');
        }
    }

    render() {
            
             //console.log(exerciseProgress);
             //console.log(languageProgress);
             console.log(this.state.exerciseProg);
             console.log(this.state.languageProg);
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
                                                {this.fill_languages_table()}
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

