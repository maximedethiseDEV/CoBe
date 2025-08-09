package com.beco.api.model.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class CompanyDto extends AbstractDto {

    private String companyName;

    private Boolean commerciallyActive = true;

    private UUID contactId;

    private UUID addressId;
    private String cityName;
    private String postalCode;
    private String countryCode;

    private UUID sharedDetailsId;

}