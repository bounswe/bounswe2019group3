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
    
   
    if(props.word != undefined && props.word != null) {
    axios.get('http://localhost:8080/lyrics_song_search?str=' + props.word)
    .then((res) => setData(res.data))
    .catch((e) => console.log("error: ",e));
    }
   
    return (
        <div>
        <div><b><u>Songs</u></b></div>
        
            {data.map((o) => (<div><div><b>Name: </b>{o.name}</div>
        <div><b>Artist: </b>{o.artist}</div>
        <div><b>Album: </b>{o.album}</div>
        <div><b>Type: </b>{o.type}</div>
        <div><b>Rating: </b>{o.rating}</div>
        <div><b>Lyrics: </b>{o.lyrics}</div>
        <div><b>Subtitles: </b>{o.subtitles}</div></div>))}

        
        </div>
    );
}

export default LyricsSongSearch;