package bounswe2019group3.implementation_assignment;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.client.RestTemplate;

@RestController
public class ImageSearchController {

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping("/image_search")
    public String image_search(@RequestParam(value="str", defaultValue="") String str) {
        RestTemplate template= new RestTemplate();
        String url="https://api.giphy.com/v1/gifs/translate?api_key=plXziMnPirNFvdURRItWfDJmAyPHvkDV&s="+str;
        
        String output="";
        output=template.getForObject(url, String.class);
        
    }
}