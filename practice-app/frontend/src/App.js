import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import ImageSearch from './ImageSearch.js'
import LyricsSongSearch from './LyricsSongSearch.js'
import SynonymsSearch from './SynonymsSearch.js'
import logo from './logo.png';
import axios from 'axios';


function App() {
  const [translation, setTranslation] = useState("");
  const [word, setWord] = useState(undefined);
  const [searchWord, setSearchWord] = useState("");

  const [data, setData] = useState([]);
  
  function translate(){
    setWord(null);
    axios.get('http://localhost:8080/translate?str='+searchWord)
    .then((res) => setWord(res.data))
    .catch((e) => console.log("error:", e));
  }

  return (
    <div>
      <div class="text-center">
        <img src={logo} alt="logo" align="middle" width="200" height="200" />
      </div>
      <div class="text-center">
        <input
          type="text"
          id="search_input"
          placeholder="type a word."
          onChange={(event) => setSearchWord(event.target.value)}
          onKeyDown={(e) => {
            if(e.keyCode == 13){
              translate()
            }
          }}
        />
        <button className="button" onClick={translate.bind(this)}>Search!</button>
        <div><b><u>Translation:</u></b> {word}</div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md">
            <ImageSearch word={word}/>
          </div>
          <div class="col-md">
            <LyricsSongSearch word={word}/>
          </div>
          <div class="col-md">
            <SynonymsSearch word={word}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
