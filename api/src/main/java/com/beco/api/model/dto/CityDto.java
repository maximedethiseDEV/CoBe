package com.beco.api.model.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class CityDto extends AbstractDto {

    private String postalCode;

    private String cityName;

    private UUID countryId;
}