package bounswe2019group3.implementation_assignment;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

@RunWith(SpringRunner.class)
@WebMvcTest(LyricsSongSearchController.class)
public class LyricsSongSearchTest {

	@Autowired
    private MockMvc mockMvc;

    @Test
    public void shouldReturnDefaultMessage() throws Exception {
        
    	RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/lyrics_song_search?str=hello").accept(MediaType.APPLICATION_JSON);
    	MvcResult result = mockMvc.perform(requestBuilder).andReturn();
    	
    	System.out.println(result.getResponse());
    	String expected = "[{name:Hello,artist:Adele,album:\"25\"},"
    			+ "{name:Hello,artist:Mohombi,album:Hello},"
    			+ "{name:Hello,artist:\"Beast feat. Sjava\",album:Hello},"
    			+ "{name:\"Hello Sunshine\",artist:\"Bruce Springsteen\",album:\"Western Stars\"},"
    			+ "{name:\"Hello My Love\",artist:Westlife,album:Spectrum}]";
    	
    	JSONAssert.assertEquals(expected, result.getResponse().getContentAsString(), false);
    }
}
