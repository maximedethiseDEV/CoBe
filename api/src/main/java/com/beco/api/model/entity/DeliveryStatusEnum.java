package com.beco.api.model.entity;

import java.util.Arrays;

public enum DeliveryStatusEnum {
    NEW(1, "NEW"),
    SCHEDULED(2, "SCHEDULED"),
    DISPATCHED(3, "DISPATCHED"),
    LOADED(4, "LOADED");

    private final int id;
    private final String status;

    DeliveryStatusEnum(int id, String status) {
        this.id = id;
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public String getStatus() {
        return status;
    }

    public static DeliveryStatusEnum fromId(int id) {
        return Arrays.stream(values())
                .filter(e -> e.getId() == id)
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(
                        "Aucun DeliveryStatusEnum correspondant à l'id : " + id));
    }

    public static DeliveryStatusEnum fromStatus(String status) {
        return Arrays.stream(values())
                .filter(e -> e.getStatus().equalsIgnoreCase(status))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(
                        "Aucun DeliveryStatusEnum correspondant au statut : " + status));
    }
}