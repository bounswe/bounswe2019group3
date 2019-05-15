import axios from 'axios';
import React, {useState} from 'react';
import {getDomain} from './utility'

function ImageSearch(props) {
    const [data,setData] = useState(undefined);
    const [word,setWord] = useState("");
    
    if(props.word && props.word != word){
      setWord(props.word);
      axios.get(getDomain() + '/image_search?str=' + props.word)
      .then((res) => setData(res.data))
      .catch((e) => console.log("error: ",e));
    }
    console.log("data", data);

    let iframe = <div/>
    if(data){
      iframe = <iframe src={data} width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
    }

    return (
        <div>
          <div><b><u>Images</u></b></div>
          {iframe}
        </div>
       
    );
}

export default ImageSearch;