package com.cobe.api.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;

@Data
@Entity
@Table(name = "purchase_order")
public class Order extends AbstractEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "construction_site_id")
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private ConstructionSite constructionSite;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shared_details_id")
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private SharedDetails sharedDetails;

    @Column(name = "quantity", nullable = false)
    private Integer quantityOrdered;

    @Column(name = "requested_delivery_begin")
    private Instant requestedDeliveryBegin;

    @Column(name = "requested_delivery_end")
    private Instant requestedDeliveryEnd;
}