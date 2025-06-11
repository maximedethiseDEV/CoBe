package com.beco.api.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "order")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Integer orderId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "billing_customer_id", nullable = false)
    private Customer billingCustomer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "delivery_customer_id", referencedColumnName = "customer_id")
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private Customer deliveryCustomer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "construction_site_id")
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private Address constructionSiteId;

    @Column(name = "quantity_ordered", nullable = false)
    private Integer quantityOrdered;

    @Column(name = "requested_delivery_date")
    private LocalDate requestedDeliveryDate;

    @Column(name = "requested_delivery_time")
    private LocalTime requestedDeliveryTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shared_details_id", referencedColumnName = "shared_details_id")
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private SharedDetails sharedDetails;
}