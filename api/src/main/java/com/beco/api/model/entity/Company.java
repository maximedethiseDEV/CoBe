package com.beco.api.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.UUID;

@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "company")
public class Company extends AbstractEntity {

    @Column(name = "name", nullable = false, unique = true)
    private String companyName;

    @Column(name = "commercially_active", nullable = false)
    private Boolean commerciallyActive = true;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "primary_contact_id", foreignKey = @ForeignKey(name = "fk_company_contact"))
    private Contact primaryContact;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "address_id", foreignKey = @ForeignKey(name = "fk_company_address"))
    private Address address;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shared_details_id")
    private SharedDetails sharedDetails;
}