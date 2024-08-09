package io.code.geek_vs_geek.config;

//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
//import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    @MessageMapping("/testcases")
    @SendTo("/topic/session")
    public String sendTestCaseResults(String message) {
        return message;
    }
}
