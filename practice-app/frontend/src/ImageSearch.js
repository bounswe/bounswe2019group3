import axios from 'axios';
import React, {useState} from 'react';
import {getDomain} from './utility'

function ImageSearch(props) {
    const [data,setData] = useState([]);
    const [word,setWord] = useState("");
    
    if(props.word && props.word != word){
      setWord(props.word);
      axios.get(getDomain() + '/image_search?str=' + props.word)
      .then((res) => setData(res.data || []))
      .catch((e) => console.log("error: ",e));
    }
    return (
        <div>
        <div><b><u>Images</u></b></div>
        <div style={{ width: "100%" }} style={{ height: "0" }} style={{ paddingBottom: "69%" }} style={{ position: "relative" }}><iframe src={data} height="100%" width="100%" style={{position:"absolute"}} frameBorder="0" allowFullScreen></iframe></div><p><a href={data}>via GIPHY</a></p>
     
          
        </div>
       
    );
}

export default ImageSearch;