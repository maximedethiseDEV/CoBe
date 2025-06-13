package com.beco.api.model.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "delivery_status")
public class DeliveryStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "status_id")
    private Integer statusId;

    @Column(name = "status", nullable = false, unique = true)
    private String status;

    /**
     * Obtenir l'Enum correspondant au statut stocké.
     */
    public DeliveryStatusEnum toEnum() {
        return DeliveryStatusEnum.fromStatus(status);
    }

    /**
     * Associer un Enum à cette entité.
     */
    public void fromEnum(DeliveryStatusEnum statusEnum) {
        this.statusId = statusEnum.getId();
        this.status = statusEnum.getStatus();
    }

}