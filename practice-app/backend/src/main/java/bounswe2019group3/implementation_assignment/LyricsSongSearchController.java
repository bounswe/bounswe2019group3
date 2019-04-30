package bounswe2019group3.implementation_assignment;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.client.RestTemplate;

class Song {
	String name = "";
	String artist = "";
	String album = "";
	String type = "";
	String rating = "";
	String has_lyrics = "No";
	String has_subtitles = "No";
	String last_updated_time ="";
	
	public Song(){}

	public Song(String name, String artist, String album,String type,String rating,String has_lyrics,String has_subtitles,String updated_time){
		this.name = name;
		this.artist = artist;
		this.album = album;
		this.rating = rating;
		this.has_lyrics = has_lyrics;
		this.last_updated_time = updated_time;
		this.type = type;
		this.has_subtitles = has_subtitles;
	}

	public String getHas_subtitles() {
		return has_subtitles;
	}

	public void setHas_subtitles(String has_subtitles) {
		this.has_subtitles = has_subtitles;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getUpdated_time() {
		return last_updated_time;
	}

	public void setUpdated_time(String updated_time) {
		this.last_updated_time = updated_time;
	}

	public String getHas_lyrics() {
		return has_lyrics;
	}

	public void setHas_lyrics(String has_lyrics) {
		this.has_lyrics = has_lyrics;
	}

	public String getRating() {
		return rating;
	}

	public void setRating(String rating) {
		this.rating = rating;
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

	@CrossOrigin(origins = "http://localhost:3000")
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
	    		index = s.indexOf("track_rating",index);
	    		start = index + 14;
	    		index = s.indexOf(",",start);
	    		song.rating = s.substring(start,index) ;
	    		index = s.indexOf("has_lyrics",index);
	    		start = index + 12;
	    		index = s.indexOf(",",start);
	    		String lyrics = s.substring(start,index) ;
	    		if(lyrics.equals("1")) {
	    			song.has_lyrics = "Yes";
	    		}
	    		index = s.indexOf("has_subtitles",index);
	    		start = index + 15;
	    		index = s.indexOf(",",start);
	    		String subtitle = s.substring(start,index) ;
	    		if(subtitle.equals("1")) {
	    			song.has_subtitles = "Yes";
	    		}
	    		index = s.indexOf("album_name", index);
	    		start = index + 13;
	    		index = s.indexOf("\"",start);
	    		song.album = s.substring(start, index);
	    		index = s.indexOf("artist_name",index);
	    		start = index + 14;
	    		index = s.indexOf("\"",start);
	    		song.artist = s.substring(start, index);
	    		index = s.indexOf("updated_time",start);
	    		start = index + 15;
	    		index = s.indexOf("\"",start);
	    		song.last_updated_time = s.substring(start, index);
	    		index = s.indexOf("music_genre_name",start);
	    		start = index + 19;
	    		index = s.indexOf("\"",start);
	    		song.type = s.substring(start, index);
	    	} 
	    	else break;
	    	songs[i] = song;
	    }
      
		return songs;
	}


}