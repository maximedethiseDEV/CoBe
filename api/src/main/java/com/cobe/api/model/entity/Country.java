package com.cobe.api.model.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "country")
public class Country extends AbstractEntity {

    @Column(name = "country_code", unique = true, nullable = false)
    private String countryCode;

    @Column(name = "country_name", nullable = false)
    private String countryName;
}