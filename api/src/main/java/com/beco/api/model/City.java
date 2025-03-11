package com.beco.api.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "city")
public class City {

    @Id
    @Column (name = "city_id")
    private String cityId;

    @Column(name = "city_name", nullable = false)
    private String cityName;

    @Column(name = "destination_code")
    private String destinationCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "country_id", nullable = false)
    private Country country;

}
