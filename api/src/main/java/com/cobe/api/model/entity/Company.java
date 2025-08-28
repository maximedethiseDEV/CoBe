package com.cobe.api.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "company")
public class Company extends AbstractEntity {

    @Column(name = "name", nullable = false, unique = true)
    private String companyName;

    @Column(name = "commercially_active", nullable = false)
    private Boolean commerciallyActive = true;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "address_id")
    private Address address;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shared_details_id")
    private SharedDetails sharedDetails;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Company parent;
}