package com.beco.api.model.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class AddressDto extends AbstractDto {

    private String street;

    private UUID cityId;
    private String cityName;
    private String postalCode;
    private String countryCode;
}