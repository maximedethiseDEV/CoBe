package com.beco.api.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "country")
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "country_id")
    private Integer countryId;

    @Column(name = "country_code", unique = true, nullable = false)
    private String countryCode;

    @Column(name = "country_name", nullable = false)
    private String countryName;
}