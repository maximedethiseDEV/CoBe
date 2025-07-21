package com.beco.api.model.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class CountryDto extends AbstractDto {

    private String countryName;

    private String countryCode;
}
