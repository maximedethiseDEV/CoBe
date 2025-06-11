package com.beco.api.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "company")
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "company_id")
    private Integer companyId;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "commercially_active", nullable = false)
    private Boolean commerciallyActive = true;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "primary_contact_id", referencedColumnName = "contact_id", foreignKey = @ForeignKey(name = "fk_company_contact"))
    private Contact primaryContact;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "address_id", referencedColumnName = "address_id", foreignKey = @ForeignKey(name = "fk_company_address"))
    private Address address;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shared_details_id", referencedColumnName = "shared_details_id")
    private SharedDetails sharedDetails;
}