package com.cobe.api.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
@Table(name = "city")
public class City extends AbstractEntity {

    @Column(name = "postal_code", nullable = false)
    private String postalCode;

    @Column(name = "city_name", nullable = false)
    private String cityName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "country_id", nullable = false)
    @NotNull(message = "Le pays est obligatoire")
    private Country country;
}