import React from 'react';
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';


export default class Question extends React.Component {
    
    render() {
        return (
            <div>

                <div className="question text3">{this.props.question}</div><br/>
                <div className="answers" >
                    <div>
                        <input type="radio" id="1" name={this.props.id} />
                        <label for="huey">{this.props.answers[0]}</label>
                    </div>
                    <div>
                        <input type="radio" id="2" name={this.props.id} />
                        <label for="huey">{this.props.answers[1]}</label>
                    </div>
                    <div>
                        <input type="radio" id="3" name={this.props.id} />
                        <label for="huey">{this.props.answers[2]}</label>
                    </div>
                    <div>
                        <input type="radio" id="4" name={this.props.id} />
                        <label for="huey">{this.props.answers[3]}</label>
                    </div>
                </div>
            </div>
        );
    }
}