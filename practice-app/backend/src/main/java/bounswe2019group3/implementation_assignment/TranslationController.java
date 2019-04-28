package bounswe2019group3.implementation_assignment;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.io.*;
import java.net.*;
import java.util.*;

@RestController
public class TranslationController {

    @RequestMapping("/translate")
    public String translate(@RequestParam(value="str", defaultValue="") String str)throws UnsupportedEncodingException, IOException {
		URL url = new URL("https://translate.yandex.net/api/v1.5/tr.json/translate");
		HttpURLConnection con = (HttpURLConnection) url.openConnection();
		con.setRequestMethod("GET");
		Map<String, String> parameters = new HashMap<>();
		parameters.put("key","trnsl.1.1.20190425T111339Z.e888bc93243b1046.ea3d1e7e36e149db66a5e362d43d0e8b53686f51");
		parameters.put("text" ,str);
		parameters.put("lang","tr-en");
		con.setDoOutput(true);
		String a="";
		DataOutputStream out = new DataOutputStream(con.getOutputStream());
		out.writeBytes(ParameterStringBuilder.getParamsString(parameters));
		BufferedReader in = new BufferedReader(
				  new InputStreamReader(con.getInputStream()));
				String inputLine;
				StringBuffer content = new StringBuffer();
				while ((inputLine = in.readLine()) != null) {
				    content.append(inputLine);
				    a=inputLine;
				}
				in.close();
		String output=a.substring(a.indexOf("[")+2,a.indexOf("]")-1);
		out.close();
        return output;
	}

	public static class ParameterStringBuilder {
	    public static String getParamsString(Map<String, String> params) 
	      throws UnsupportedEncodingException{
	        StringBuilder result = new StringBuilder();
	 
	        for (Map.Entry<String, String> entry : params.entrySet()) {
	          result.append(URLEncoder.encode(entry.getKey(), "UTF-8"));
	          result.append("=");
	          result.append(URLEncoder.encode(entry.getValue(), "UTF-8"));
	          result.append("&");
	        }
	 
	        String resultString = result.toString();
	        return resultString.length() > 0
	          ? resultString.substring(0, resultString.length() - 1)
	          : resultString;
	    }
	}
}
