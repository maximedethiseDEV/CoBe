package com.beco.api.model.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

@Data
@Entity
@Table(name = "delivery_archive")
public class DeliveryArchive {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "delivery_archive_id")
    private Integer deliveryArchiveId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "transport_supplier_id")
    private TransportSupplier transportSupplier;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "delivery_order_number_id")
    private DeliveryOrderNumber deliveryOrderNumber;

    @Column(name = "actual_delivery_date")
    @Temporal(TemporalType.DATE)
    private Date actualDeliveryDate;

    @Column(name = "actual_delivery_time")
    private Time actualDeliveryTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "status_id", nullable = false)
    private DeliveryStatus status;
}