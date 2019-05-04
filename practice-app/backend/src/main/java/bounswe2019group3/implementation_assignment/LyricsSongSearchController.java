package bounswe2019group3.implementation_assignment;

import org.json.*;
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
	String rating = "";
	String has_lyrics = "No";
	String has_subtitles = "No";
	String last_updated_time ="";
	
	public Song(){}

	public Song(String name, String artist, String album,String rating,String has_lyrics,String has_subtitles,String updated_time){
		this.name = name;
		this.artist = artist;
		this.album = album;
		this.rating = rating;
		this.has_lyrics = has_lyrics;
		this.last_updated_time = updated_time;
		this.has_subtitles = has_subtitles;
	}

	public String getHas_subtitles() {
		return has_subtitles;
	}

	public void setHas_subtitles(String has_subtitles) {
		this.has_subtitles = has_subtitles;
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
	    
	    	for(int i =0;i<5;i++) {
	    		Song song = new Song();
	    		JSONObject obj;
				try {
					obj = new JSONObject(result);
				
			JSONArray arr = obj.getJSONObject("message").getJSONObject("body").getJSONArray("track_list");
			JSONObject obj2=arr.getJSONObject(i);
		    
	    		song.name = obj2.getJSONObject("track").getString("track_name");
	    		song.artist = obj2.getJSONObject("track").getString("artist_name");
	    		song.album= obj2.getJSONObject("track").getString("album_name");
	    		song.rating = obj2.getJSONObject("track").getInt("track_rating") + "";
	    		String str1 = obj2.getJSONObject("track").getInt("has_lyrics") + "";
	    		if(str1.equals("1"))
	    			song.has_lyrics = "Yes";
	    		String str2 = obj2.getJSONObject("track").getInt("has_subtitles") + "";
	    		if(str2.equals("1"))
	    			song.has_subtitles = "Yes";
	    		song.last_updated_time = obj2.getJSONObject("track").getString("updated_time");
	    		songs[i]= song;
	    		} catch (JSONException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
	   	}
      
			return songs;
	}

}
