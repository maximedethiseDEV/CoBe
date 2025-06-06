package com.beco.api.config.sse;

import lombok.Data;

@Data
public class SseEventMessage {
    private String eventType; // ex: CREATE, UPDATE, DELETE
    private String entity;    // ex: "User", "Order", etc.
    private Object payload;   // Les données de l'entité modifiée

    public SseEventMessage(String eventType, String entity, Object payload) {
        this.eventType = eventType;
        this.entity = entity;
        this.payload = payload;
    }
}