package bounswe2019group3.implementation_assignment;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TranslationController {

    @RequestMapping("/translate")
    public String translate(@RequestParam(value="str", defaultValue="") String str) {
        return "Not Implemented";
    }
}