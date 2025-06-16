package com.beco.api.model.dto;

import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
public class PostAddressDto {

    private UUID addressId;

    private String street;

    private CityDto city;

    private Instant createdDate;

    private Instant lastModifiedDate;
}