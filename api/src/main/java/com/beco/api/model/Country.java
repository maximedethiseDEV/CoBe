package com.beco.api.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "country")
public class Country {

    @Id
    @Column (name = "country_id")
    private String countryId;

    @Column(name = "country_name", nullable = false)
    private String countryName;

    // Getters and setters
}
