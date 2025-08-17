package com.cobe.api.model.dto;

import lombok.Data;

@Data
public class CountryDto extends AbstractDto {

    private String countryName;

    private String countryCode;
}
