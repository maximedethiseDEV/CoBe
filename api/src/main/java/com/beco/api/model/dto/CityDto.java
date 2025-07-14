package com.beco.api.model.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class CityDto {

    private UUID cityId;

    private String postalCode;

    private String cityName;

    private UUID countryId;
}