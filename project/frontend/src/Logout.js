import React from "react";
import './General.css';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie'
import axios from "axios";

export default class FormPage extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            isLogout: false
        }
    }

    onLogout() {
        axios.post('http://localhost:3000/api/auth/logout', {}, { withCredentials: true })
            .then(res => {
                //console.log(res);
                if (res.status === 204) {
                    Cookies.remove('username');
                    Cookies.remove('selectedExamLanguage');
                    Cookies.remove('selectedExamGrade');
                    Cookies.remove('selectedExamLanguageAbbr');
                    Cookies.remove('message_to_person');
                    Cookies.remove('search_context');
                    Cookies.remove('search_type');
                    Cookies.remove('chat_messages');
                    Cookies.remove('selectedType');
                    Cookies.remove('selectedLanguageAbbr');
                    Cookies.remove('selectedLanguage');
                    Cookies.remove('delevel');
                    Cookies.remove('enlevel');
                    Cookies.remove('selectedExerciseId');
                    Cookies.remove('search_exercise_language');
                    Cookies.remove('search_exercise_level');
                    Cookies.remove('search_exercise_type');
                    Cookies.remove('selected_writing_abbr');
                    Cookies.remove('selected_writing_assignee');

                    this.setState({
                        isLogout: true
                    });
                } else {
                    console.log("Log out failed");
                }

            });
    };


    render() {
        if (true) {
            this.onLogout();
            return (<Redirect
                to={{
                    pathname: "/"
                }}
            />);
        }
    }
}
