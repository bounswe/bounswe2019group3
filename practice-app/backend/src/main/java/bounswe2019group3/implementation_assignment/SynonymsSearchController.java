package bounswe2019group3.implementation_assignment;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

public class SynonymsSearchController {
	@RequestMapping(
			value = "/synonyms_search", 
			method = RequestMethod.GET
			)
	@ResponseBody
	public String synonyms_search(@RequestParam(value="str", defaultValue="") String str) {
		String url = "https://dictionary.yandex.net/api/v1/dicservice.json/lookup?"
				+ "key=dict.1.1.20190429T132317Z.3574a8ebffa4ae54.4ed766f076632ac300195674b9ae79c040b4cba3&lang=en-en&text=" + str;
		
	    String data = new RestTemplate().getForObject(url, String.class);
	    
	    if(!data.contains("syn")) {
    		return "No synonyms found.";
    	}
	    
	    String syn[] =  data.substring(data.indexOf("\"syn\"")).trim().split(",");
	    
	    String result = "";
	    int counter = 1;
    
	    for (String s : syn) {
	    	if(s.contains("\"text\"")) {
	    		result += counter + ". " + s.substring(s.indexOf("\"text\":\"")).split(":")[1] + "\n";
	    		counter++;
	    	}
	    }

	    return result.trim();
	}
}
