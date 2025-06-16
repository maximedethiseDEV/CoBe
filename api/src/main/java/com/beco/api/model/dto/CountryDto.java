package com.beco.api.model.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class CountryDto {

    private UUID countryId;

    private String countryName;

    private String countryCode;
}
