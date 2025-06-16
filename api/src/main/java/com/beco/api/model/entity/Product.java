package com.beco.api.model.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.UUID;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "product")
public class Product extends AbstractAuditingEntity<UUID>{

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "product_id")
    private UUID productId;

    @Column(name = "product_code", nullable = false, unique = true)
    private String productCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "material_supplier_id", referencedColumnName = "material_supplier_id")
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private MaterialSupplier materialSupplier;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shared_details_id", referencedColumnName = "shared_details_id")
    private SharedDetails sharedDetails;
}