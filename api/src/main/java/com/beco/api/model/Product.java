package com.beco.api.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "product")
public class Product {

    @Id
    @Column(name = "product_id")
    private String productId;

    @Column(name = "name", nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "material_supplier_id")
    private MaterialSupplier materialSupplier;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    // Getters and setters
}
