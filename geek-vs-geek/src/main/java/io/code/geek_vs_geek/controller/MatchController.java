package io.code.geek_vs_geek.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.messaging.simp.SimpMessagingTemplate;

@Controller
public class MatchController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/match/{sessionId}/{username}")
    public void handleTestCaseResults(@DestinationVariable String sessionId, 
                                      @DestinationVariable String username,
                                      TestCaseResultsMessage message) {
        messagingTemplate.convertAndSend("/topic/match/" + sessionId, 
                                         new MatchResultMessage(username, message.getPassedTestCases()));
    }
}
