package com.beco.api.config.sse;

import com.beco.api.config.sse.SseService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;

@RestController
@RequestMapping("/subscribe")
@CrossOrigin(origins = "http://localhost:4200")
public class SseController {

    private final SseService sseService;

    public SseController(SseService sseService) {
        this.sseService = sseService;
    }

    @GetMapping
    public SseEmitter subscribe(Authentication authentication) throws IOException {
        String userId = authentication.getName();
        return sseService.createEmitter(userId);
    }

    @Scheduled(fixedRate = 30000)
    public void heartbeat(Authentication authentication) throws IOException {
        String userId = authentication.getName();
        sseService.sendHeartbeat(userId);
    }
}