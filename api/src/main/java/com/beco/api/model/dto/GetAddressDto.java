package com.beco.api.model.dto;

import lombok.Data;

@Data
public class GetAddressDto {

    private Integer addressId;

    private String cityName;

    private String street;
}