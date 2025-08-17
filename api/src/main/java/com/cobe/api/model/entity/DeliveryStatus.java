package com.cobe.api.model.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "delivery_status")
public class DeliveryStatus extends AbstractEntity {

    @Column(name = "name", nullable = false, unique = true)
    private String name;
}