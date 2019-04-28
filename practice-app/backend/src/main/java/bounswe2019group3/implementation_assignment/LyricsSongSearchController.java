package bounswe2019group3.implementation_assignment;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LyricsSongSearchController {

    @RequestMapping("/lyrics_song_search")
    public String lyrics_song_search(@RequestParam(value="str", defaultValue="") String str) {
        return "Not Implemented";
    }
}