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

    @Column(name = "code_as400", nullable = false, unique = true)
    private String codeAS400;

    @Column(name = "code_sap", nullable = false, unique = true)
    private String codeSAP;

    @Column(name = "name_short", nullable = false)
    private String nameShort;

    @Column(name = "name_long", nullable = false)
    private String nameLong;

    @Column(name = "category", nullable = false)
    private String category;

    @Column(name = "is_valid", nullable = false)
    private Boolean isValid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "material_supplier_id")
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private MaterialSupplier materialSupplier;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shared_details_id")
    private SharedDetails sharedDetails;
}