package com.beco.api.model.dto;

import lombok.Data;

@Data
public class PostAddressDto {

    private Integer addressId;

    private Integer cityId;

    private String street;
}