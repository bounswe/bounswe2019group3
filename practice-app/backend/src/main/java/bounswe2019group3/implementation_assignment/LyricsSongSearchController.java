package bounswe2019group3.implementation_assignment;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

class Song {
	String name = "";
	String artist = "";
	String album = "";

	public Song(){}

	public Song(String name, String artist, String album){
		this.name = name;
		this.artist = artist;
		this.album = album;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAlbum() {
		return album;
	}

	public void setAlbum(String album) {
		this.album = album;
	}

	public String getArtist() {
		return artist;
	}

	public void setArtist(String artist) {
		this.artist = artist;
	}
}

@RestController
public class LyricsSongSearchController {

	@RequestMapping(
			value = "/lyrics_song_search", 
			method = RequestMethod.GET, 
			produces = MediaType.APPLICATION_JSON_VALUE
			)
	@ResponseBody
	public Song[] lyrics_song_search(@RequestParam(value="str", defaultValue="") String str) {
		Song[] songs = songsFromApi(str);
		return songs;
	}



	public Song[] songsFromApi(String str){
		
		Song[] songs = new Song[5];
		final String uri = "http://api.musixmatch.com/ws/1.1/track.search?q_track="+str+"&page_size=5&page=1&s_track_rating=desc&apikey=12154629a3c690adcc1f939dff615213";
	     
	    RestTemplate restTemplate = new RestTemplate();
	    String result = restTemplate.getForObject(uri, String.class);
	    
	    String s = result;
	    int start = 0;
	    for(int i=0; i<5; i++){
	    	Song song = new Song();
	    	int index = s.indexOf("track_name",start);
	    	if(index > 0){
	    		start = index + 13;
	    		index = s.indexOf("\"",start);
	    		song.name = s.substring(start, index);
	    		index = s.indexOf("album_name", index);
	    		start = index + 13;
	    		index = s.indexOf("\"",start);
	    		song.album = s.substring(start, index);
	    		index = s.indexOf("artist_name",index);
	    		start = index + 14;
	    		index = s.indexOf("\"",start);
	    		song.artist = s.substring(start, index);
	    	} 
	    	else break;
	    	songs[i] = song;
	    }
		
		return songs;
	}


}