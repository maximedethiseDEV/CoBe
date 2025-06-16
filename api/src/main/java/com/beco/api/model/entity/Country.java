package com.beco.api.model.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Data
@Entity
@Table(name = "country")
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "country_id")
    private UUID countryId;

    @Column(name = "country_code", unique = true, nullable = false)
    private String countryCode;

    @Column(name = "country_name", nullable = false)
    private String countryName;
}