import React, {useState} from 'react';
import axios from 'axios';


function SynonymsSearch(props) {
    const [data,setData] = useState([]);

    if(props.word != undefined && props.word != null){
        axios.get('http://localhost:8080/synonyms_search?str=' + props.word)
        .then((res) => setData(res.data))
        .catch((e) => console.log("error:", e));
    }

    return (
        <div>
            <b><u>Synonyms</u></b>
            {data.map((s) => (<div>{s}</div>))}
        </div>
    );
}

export default SynonymsSearch;