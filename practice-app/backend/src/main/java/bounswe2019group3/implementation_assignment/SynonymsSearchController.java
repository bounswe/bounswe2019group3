package bounswe2019group3.implementation_assignment;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class SynonymsSearchController {
	@RequestMapping (value = "/synonyms_search")
	@ResponseBody
	public ArrayList<String> synonyms_search(@RequestParam(value="str", defaultValue="") String str) {
		String url = "https://dictionary.yandex.net/api/v1/dicservice.json/lookup?"
				+ "key=dict.1.1.20190429T132317Z.3574a8ebffa4ae54.4ed766f076632ac300195674b9ae79c040b4cba3&lang=en-en&text=" + str;
		
	    String data = new RestTemplate().getForObject(url, String.class);
	   
	    if(!data.contains("syn")) {
    		return null;
    	}
	    
	    String syn[] =  data.substring(data.indexOf("\"syn\"")).trim().split(",");
	    ArrayList<String> result = new ArrayList<String>();
    
	    for (int i = 0; i < syn.length; i++) {
	    	if(syn[i].contains("\"text\"")) {
	    		result.add(syn[i].substring(syn[i].indexOf("\":\"") + 3, syn[i].length()-1));
	    	}
	    }

	    return result;
	}
}
