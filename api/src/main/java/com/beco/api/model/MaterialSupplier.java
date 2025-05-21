package com.beco.api.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Data
@Entity
@Table(name = "material_supplier")
public class MaterialSupplier {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "material_supplier_id")
    private Integer materialSupplierId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contact_id", referencedColumnName = "contact_id")
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private Contact contact;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "loading_address_id", referencedColumnName = "address_id")
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private Address loadingAddress;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;
}