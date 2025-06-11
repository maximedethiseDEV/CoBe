package com.beco.api.model.dto;

import lombok.Data;

@Data
public class CityDto {

    private Integer cityId;

    private String postalCode;

    private String cityName;

    private CountryDto country;
}