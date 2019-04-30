import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import ImageSearch from './ImageSearch.js'
import LyricsSongSearch from './LyricsSongSearch.js'
import SynonymsSearch from './SynonymsSearch.js'

let translation = "hello world";
let word = "deneme"
let waiting_for_word = false


function App() {
  return (
    <div>
      <div class="text-center">
        <input
          type="text"
          id="search_input"
          placeholder="type a word."
        />
        <button className="button">Search!</button>
        <div>Translation: {translation}</div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md">
            <ImageSearch word={word} waiting_for_word={waiting_for_word}/>
          </div>
          <div class="col-md">
            <LyricsSongSearch word={word} waiting_for_word={waiting_for_word}/>
          </div>
          <div class="col-md">
            <SynonymsSearch word={word} waiting_for_word={waiting_for_word}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
