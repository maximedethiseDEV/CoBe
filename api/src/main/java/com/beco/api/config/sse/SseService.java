package com.beco.api.config.sse;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class SseService {

    private final ConcurrentHashMap<String, SseEmitter> emitters = new ConcurrentHashMap<>();

    private SseEmitter emitter;
    private Integer lastId = 0;

    // Associer un SseEmitter à un utilisateur
    public SseEmitter createEmitter(String userId) {
        SseEmitter emitter = new SseEmitter();
        emitters.put(userId, emitter);

        // Retirer l'emitter en cas de déconnexion
        emitter.onCompletion(() -> emitters.remove(userId));
        emitter.onTimeout(() -> emitters.remove(userId));
        emitter.onError(e -> emitters.remove(userId));

        return emitter;
    }


    public void sendHeartbeat(String userId) throws IOException {
        SseEmitter emitter = emitters.get(userId);
        if (emitter != null) {
            sendMessageToUser(userId, "heartbeat");
        }
    }

    // Envoyer un message spécifique à un utilisateur
    public void sendMessageToUser(String userId, Object data) throws IOException {
        SseEmitter emitter = emitters.get(userId);
        if (emitter != null) {
            emitter.send(SseEmitter.event().name("message").data(data));
        }
    }

    // Envoyer un message à tous les utilisateurs connectés
    public void broadcastMessage(Object data) {
        emitters.forEach((userId, emitter) -> {
            try {
                emitter.send(SseEmitter.event().name("message").data(data));
            } catch (IOException e) {
                emitters.remove(userId);
            }
        });
    }

}