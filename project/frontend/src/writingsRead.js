import React, { Component } from 'react'
import { MDBBtn, Card, MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import './General.css';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'
import { TokenAnnotator, TextAnnotator } from 'react-text-annotate'
import { State, Toggle } from 'react-powerplug'
import Annotation from 'react-image-annotation';
import {
    RectangleSelector
} from 'react-image-annotation/lib/selectors'

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
                    if (res.data[i].target.type === "Text") {
                        var temp = res.data[i].target.selector.value.substring(5);
                        temp_data[i] =
                        {
                            start: parseInt(temp.split(',')[0]),
                            end: parseInt(temp.split(',')[1]),
                            tag: res.data[i].body.value
                        }
                    } else {
                        var temp = res.data[i].target.selector.value.substring(5);
                        console.log(temp);
                        temp_data[i] =
                        {
                            selection: {
                                mode: "EDITING",
                                anchorX: parseInt(temp.split(',')[0]),
                                anchorY: parseInt(temp.split(',')[1]),
                                showEditor: true
                            },
                            geometry: {
                                type: "RECTANGLE",
                                x: parseInt(temp.split(',')[0]),
                                y: parseInt(temp.split(',')[1]),
                                width: parseInt(temp.split(',')[2]),
                                height: parseInt(temp.split(',')[3]),
                            },
                            data: {
                                text: res.data[i].body.value
                            }
                        }
                    }

                }
                this.setState({
                    value: temp_data,
                    image_annotations: temp_data
                })
            })
        this.state = {
            isSended: false,
            value: [],
            tag: '',
            image_annotations: [],
            image_annotation: {}
        }

    }


    image_onChange = (image_annotation) => {
        this.setState({ image_annotation })
    }

    image_onSubmit = (image_annotation) => {
        const { geometry, data } = image_annotation

            const element = image_annotation

            console.log(element);
            const frm = {
                "@context": "http://www.w3.org/ns/anno.jsonld",
                type: "Annotation",
                body: {
                    type: "TextualBody",
                    value: element.data.text,
                    format: "text/plain"
                },
                target: {
                    source: "http://18.184.207.248/api/writing/" + content.writing_id,
                    creator: Cookies.get('username'),
                    type: "Image",
                    selector: {
                        type: "FragmentSelector",
                        conformsTo: "http://tools.ietf.org/rfc/rfc5147",
                        value: "xywh=" + element.geometry.x + "," + element.geometry.y + ","+ element.geometry.width + ","+ element.geometry.height ,
                    }
                }
            };
            axios.post('http://18.184.207.248/api/annotation', frm, { withCredentials: true })
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        console.log(element.tag);
                    }
                })


        this.setState({
            image_annotation: {},
            image_annotations: this.state.image_annotations.concat({
                geometry,
                data: {
                    ...data,
                    id: Math.random()
                }
            })
        })
    }

    submit(annotations) {
        for (let i = 0; i < annotations.value.length; i++) {
            const element = annotations.value[i];

            if (element.color === 'yellow') {
                console.log(element);
                const frm = {
                    "@context": "http://www.w3.org/ns/anno.jsonld",
                    type: "Annotation",
                    body: {
                        type: "TextualBody",
                        value: element.tag,
                        format: "text/plain"
                    },
                    target: {
                        source: "http://18.184.207.248/api/writing/" + content.writing_id,
                        creator: Cookies.get('username'),
                        type: "Text",
                        selector: {
                            type: "FragmentSelector",
                            conformsTo: "http://tools.ietf.org/rfc/rfc5147",
                            value: "char=" + element.start + "," + element.end,
                        }
                    }
                };
                axios.post('http://18.184.207.248/api/annotation', frm, { withCredentials: true })
                    .then(res => {
                        console.log(res);
                        if (res.status === 200) {
                            console.log(element.tag);
                        }
                    })

            }
        }
        this.setState({
            isSended:true
        })
    }
    myonFocus(element) {
        element.target.value = "";
    }
    textWriting() {
        const state = this.state;
        const setState = this.setState.bind(this);
        var row = [];

        row[0] = (
            <div>
                <center> <div className="commentsec_title "> {content.title}  </div></center>
                <MDBRow>
                    <br />
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
                </MDBRow>
                <MDBRow><MDBBtn color="blue" onClick={this.submit.bind(this, state)} className="text2"> Send Annotation</MDBBtn></MDBRow>



            </div>

        );

        return row;
    }
    imageWriting() {
        var row = [];
        row[0] = (
            <div>
                <div className="ExamBox"> {content.title} </div>
                <Annotation
                    src={"http://18.184.207.248/" + content.image}
                    alt='.'

                    annotations={this.state.image_annotations}
                    type={RectangleSelector}
                    value={this.state.image_annotation}
                    onChange={this.image_onChange}
                    onSubmit={this.image_onSubmit}
                />
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
        if(this.state.isSended){
            return (<Redirect
                push to={{
                  pathname: "/writingsList"
                }}
              />);
        }

        if (content.image === null) {
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
        else {
            return (
                <MDBContainer fluid>
                    <MDBRow className="topMargined">
                        <center><img className="backpicture" src=".\earth3.png" alt="." width="80%" /></center>
                        <MDBCol>
                            <div className="marginedleft20">
                                <MDBRow>
                                    <MDBCol>
                                        <MDBRow><center>
                                            <div className="ExamBox"> {content.title} </div>
                                            <Annotation
                                                src={"http://18.184.207.248/" + content.image}
                                                alt='.'

                                                annotations={this.state.image_annotations}

                                                type={this.state.type}
                                                value={this.state.image_annotation}
                                                onChange={this.image_onChange}
                                                onSubmit={this.image_onSubmit}
                                            />
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