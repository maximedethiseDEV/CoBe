package com.beco.api.model.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.sql.Time;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "delivery")
public class Delivery extends AbstractEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "transport_supplier_id", nullable = false)
    private TransportSupplier transportSupplier;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "delivery_order_number_id", nullable = false)
    private DeliveryOrderNumber deliveryOrderNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "status_id", nullable = false)
    private DeliveryStatus status;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name = "actual_delivery_begin")
    private Instant actualDeliveryBegin;

    @Column(name = "actual_delivery_end")
    private Instant actualDeliveryEnd;
}