import React from "react";
import './General.css';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie'
import axios from "axios";

export default class FormPage extends React.Component {


    constructor(props){
        super(props);
        this.state={
            isLogout: false
        }
    }

    onLogout() {
        axios.post('http://18.184.207.248/api/auth/logout', {}, { withCredentials: true })
            .then(res => {
                //console.log(res);
                if (res.status === 204) {
                    Cookies.remove('username');
                    Cookies.remove('selectedExamLanguage');
                    Cookies.remove('selectedExamGrade');
                    Cookies.remove('selectedExamLanguageAbbr');
                    Cookies.remove('message_to_person')
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
            return(<Redirect
                to={{
                    pathname: "/"
                }}
            />);
        }
    }
}
