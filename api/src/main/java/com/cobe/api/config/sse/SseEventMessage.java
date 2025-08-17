package com.cobe.api.config.sse;

import lombok.Data;

@Data
public class SseEventMessage {
    private String eventType;
    private String entity;
    private Object payload;

    public SseEventMessage(String eventType, String entity, Object payload) {
        this.eventType = eventType;
        this.entity = entity;
        this.payload = payload;
    }
}