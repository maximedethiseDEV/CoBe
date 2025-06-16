package com.beco.api.model.entity;

import java.util.Arrays;

public enum DeliveryStatusEnum {
    NEW(1, "Supprimé"),
    SCHEDULED(2, "Non affrété"),
    PLANNED(3, "Planifié"),
    DISPATCHED(4, "Affrété"),
    LOADED(5,"Chargé"),
    DELIVERD(6,"Livré");

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

    public static DeliveryStatusEnum fromStatus(String status) {
        return Arrays.stream(values())
                .filter(e -> e.getStatus().equalsIgnoreCase(status))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(
                        "Aucun DeliveryStatusEnum correspondant au statut : " + status));
    }
}