import React from 'react';
import axios from 'axios';
import React, {useState} from 'react';

let name="name";
let artist="artist";
let album="album";
let type="type";
let rating="rating";
let lyrics="yes";
let subtitles="yes";



function LyricsSongSearch(props) {
    
    const [data,setData] = useState([]);
    
    function songSearch() {
    axios.get('http://localhost:3000/lyrics_song_search?str=' + props.word)
    .then((res) => setData(res.data) 
    .catch((e) => console.log("error",e));

  }
    return (
        <div>
        <div><b>LyricsSongSearch word: </b>{props.word}</div>
        <div><b>Name: </b>{name}</div>
        <div><b>Artist: </b>{artist}</div>
        <div><b>Album: </b>{album}</div>
        <div><b>Type: </b>{type}</div>
        <div><b>Rating: </b>{rating}</div>
        <div><b>Lyrics: </b>{lyrics}</div>
        <div><b>Subtitles: </b>{subtitles}</div>
        </div>
    );
}

export default LyricsSongSearch;