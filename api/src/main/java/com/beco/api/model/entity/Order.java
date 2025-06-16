package com.beco.api.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;
import java.util.UUID;

@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "purchase_order")
public class Order extends AbstractAuditingEntity<UUID> {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "order_id")
    private UUID orderId;

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

    @Column(name = "quantity", nullable = false)
    private Integer quantityOrdered;

    @Column(name = "requested_delivery_date")
    @Temporal(TemporalType.DATE)
    private Date requestedDeliveryDate;

    @Column(name = "requested_delivery_time")
    private Time requestedDeliveryTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shared_details_id", referencedColumnName = "shared_details_id")
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private SharedDetails sharedDetails;
}