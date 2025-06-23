package com.beco.api.config.sse;

import com.beco.api.config.exception.SseExceptionHandler;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class SseService {

    private final Map<String, CopyOnWriteArrayList<SseEmitter>> emittersPerEntity = new ConcurrentHashMap<>();
    private final SseExceptionHandler sseExceptionHandler;

    public SseService(SseExceptionHandler sseExceptionHandler) {
        this.sseExceptionHandler = sseExceptionHandler;
    }

    public SseEmitter subscribeToEntity(String entity) {
        SseEmitter emitter = new SseEmitter(0L);
        emittersPerEntity.computeIfAbsent(entity, key -> new CopyOnWriteArrayList<>()).add(emitter);

        emitter.onCompletion(() -> removeEmitter(entity, emitter));
        emitter.onTimeout(() -> removeEmitter(entity, emitter));
        emitter.onError((e) -> removeEmitter(entity, emitter));

        return emitter;
    }

    private void removeEmitter(String entity, SseEmitter emitter) {
        CopyOnWriteArrayList<SseEmitter> emitters = emittersPerEntity.get(entity);
        if (emitters != null) {
            emitters.remove(emitter);
        }
    }

    // Ici, on continue à attraper les IOException lors de l'envoi, car
    // c’est lié au transport réseau ou à la fermeture du client
    public void broadcastToEntity(String entity, SseEventMessage message) {
        CopyOnWriteArrayList<SseEmitter> emitters = emittersPerEntity.get(entity);

        if (emitters != null) {
            for (SseEmitter emitter : emitters) {
                try {
                    emitter.send(SseEmitter.event().name("UPDATE").data(message));
                } catch (IOException e) {
                    removeEmitter(entity, emitter);
                }
            }
        }
    }

    public void sendHeartbeat(String entity) {
        CopyOnWriteArrayList<SseEmitter> emitters = emittersPerEntity.get(entity);

        if (emitters != null) {
            for (SseEmitter emitter : emitters) {
                try {
                    emitter.send(
                            SseEmitter.event()
                                    .name("HEARTBEAT")
                                    .data("ping")
                                    .id(String.valueOf(System.currentTimeMillis()))
                    );
                } catch (IOException e) {
                    removeEmitter(entity, emitter);
                }
            }
        }
    }
}
