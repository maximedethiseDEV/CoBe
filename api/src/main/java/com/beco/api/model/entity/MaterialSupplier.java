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
@Table(name = "material_supplier")
public class MaterialSupplier extends AbstractEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contact_id")
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private Contact contact;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "loading_address_id")
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private Address loadingAddress;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shared_details_id")
    private SharedDetails sharedDetails;
}