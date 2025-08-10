package com.beco.api.model.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.UUID;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "transport_supplier")
public class TransportSupplier extends AbstractEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false, unique = true)
    private Company company;

    @Column(name = "license_number")
    private String license;
}