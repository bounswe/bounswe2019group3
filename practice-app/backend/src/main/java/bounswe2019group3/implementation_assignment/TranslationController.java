package bounswe2019group3.implementation_assignment;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.client.RestTemplate;

@RestController
public class TranslationController {

	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value ="/translate",
			method = RequestMethod.GET 
			)
	public String translate(@RequestParam(value="str", defaultValue=" ") String str) {
		RestTemplate template= new RestTemplate();
		String output=" ";
		String url="https://translate.yandex.net/api/v1.5/tr.json/translate?"+
				"key="+"trnsl.1.1.20190425T111339Z.e888bc93243b1046.ea3d1e7e36e149db66a5e362d43d0e8b53686f51"+
				"&lang=tr-en" +
				"&text="+str;

		output=template.getForObject(url, String.class);
		output=output.substring(output.indexOf("[")+2,output.indexOf("]")-1);

		return output;
	}
}
