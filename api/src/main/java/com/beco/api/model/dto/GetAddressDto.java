package com.beco.api.model.dto;

import lombok.Data;

@Data
public class GetAddressDto {

    private Integer addressId;

    private String street;

    private String cityName;

    private String countryCode;
}