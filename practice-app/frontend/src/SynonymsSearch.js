import React, {useState} from 'react';
import axios from 'axios';


function SynonymsSearch(props) {
    const [data,setData] = useState([]);
    const [word,setWord] = useState("");

    if(props.word && props.word != word){
        setWord(props.word);
        axios.get('http://localhost:8080/synonyms_search?str=' + props.word)
        .then((res) => setData(res.data))
        .catch((e) => console.log("error:", e));
    }

    return (
        <div>
            <b><u>Synonyms</u></b>
            <ul>
                {data.map((s) => (<li>{s}</li>))}
            </ul>
        </div>
    );
}

export default SynonymsSearch;