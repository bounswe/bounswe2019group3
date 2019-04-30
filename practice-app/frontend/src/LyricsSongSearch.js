import axios from 'axios';
import React, {useState, useEffect} from 'react';


function LyricsSongSearch(props) {
    
    const [data,setData] = useState([]);
    const [word,setWord] = useState("");
    
    if(props.word && props.word != word){
      setWord(props.word);
      axios.get('http://localhost:8080/lyrics_song_search?str=' + props.word)
      .then((res) => setData(res.data))
      .catch((e) => console.log("error: ",e));
    }
   
    return (
        <div>
        <div><b><u>Songs</u></b></div>
            {data.map((o) => {
              if(o){
                return (<div className="boxed"><div><b>Name: </b>{o.name}</div>
                  <div><b>Artist: </b>{o.artist}</div>
                  <div><b>Album: </b>{o.album}</div>
                  <div><b>Type: </b>{o.type}</div>
                  <div><b>Rating: </b>{o.rating}</div></div>)
              }
            })}
        </div>
    );
}

export default LyricsSongSearch;