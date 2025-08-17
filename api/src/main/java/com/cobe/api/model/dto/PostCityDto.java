package com.cobe.api.model.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class PostCityDto extends AbstractDto {

    private String postalCode;

    private String cityName;

    private UUID countryId;
}