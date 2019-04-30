package bounswe2019group3.implementation_assignment;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
public class ImageSearchController {

    //@CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping("/image_search")
    public String image_search(@RequestParam(value="str", defaultValue="") String str) {
        return "Not Implemented";
    }
}