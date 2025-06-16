package com.beco.api.model.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Data
@Entity
@Table(name = "delivery_order_number")
public class DeliveryOrderNumber {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "delivery_order_number_id")
    private UUID deliveryOrderNumberId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "transport_supplier_id", nullable = false)
    private TransportSupplier transportSupplier;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "city_id", nullable = false)
    private City city;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "unique_delivery_order_number", unique = true, nullable = false)
    private String uniqueDeliveryOrderNumber;
}