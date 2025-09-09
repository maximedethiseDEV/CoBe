package com.cobe.api.model.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class CompanyDto extends AbstractDto {

    private String companyName;

    private Boolean commerciallyActive = true;

    private String codeSAP;
    private String codeAS400;

    private UUID parentId;

    private UUID addressId;
    private String street;
    private String cityName;
    private String postalCode;
    private String countryCode;

    private UUID sharedDetailsId;

}