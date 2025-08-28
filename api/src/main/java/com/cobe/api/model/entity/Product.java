package com.cobe.api.model.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Data
@Entity
@Table(name = "product")
public class Product extends AbstractEntity {

    @Column(name = "code", nullable = false, unique = true)
    private String code;

    @Column(name = "name", nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "material_supplier_id")
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private MaterialSupplier materialSupplier;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shared_details_id")
    private SharedDetails sharedDetails;
}