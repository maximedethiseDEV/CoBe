package com.beco.api.model.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class CityDto extends AbstractDto {

    private String cityName;
    private String postalCode;

    private UUID countryId;
    private String countryCode;
}