package com.beco.api.model.dto;

import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
public class GetAddressDto {

    private UUID id;

    private String street;

    private String cityName;

    private String countryCode;

    private Instant createdDate;

    private Instant lastModifiedDate;
}