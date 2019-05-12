package bounswe2019group3.implementation_assignment;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.skyscreamer.jsonassert.Customization;
import org.skyscreamer.jsonassert.JSONAssert;
import org.skyscreamer.jsonassert.JSONCompareMode;
import org.skyscreamer.jsonassert.RegularExpressionValueMatcher;
import org.skyscreamer.jsonassert.comparator.CustomComparator;
import org.skyscreamer.jsonassert.comparator.JSONComparator;
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
   
    	String expected = "[{\"name\":\".+\",\"artist\":\".+\",\"album\":\".+\"},"
    			+ "{\"name\":\".+\",\"artist\":\".+\",\"album\":\".+\"},"
    			+ "{\"name\":\".+\",\"artist\":\".+\",\"album\":\".+\"},"
    			+ "{\"name\":\".+\",\"artist\":\".+\",\"album\":\".+\"},"
    			+ "{\"name\":\".+\",\"artist\":\".+\",\"album\":\".+\"}]";
    	
    	JSONAssert.assertEquals(
    		    expected,
    		    result.getResponse().getContentAsString(),
    		    (JSONComparator) new CustomComparator(
    		        JSONCompareMode.LENIENT,
    		        new Customization("***", new RegularExpressionValueMatcher<Object>())
    		    )
    		);

    }
}
