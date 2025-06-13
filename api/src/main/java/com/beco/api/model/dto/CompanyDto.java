package com.beco.api.model.dto;

import lombok.Data;

@Data
public class CompanyDto {

    private Integer companyId;

    private String companyName;

    private Boolean commerciallyActive = true;

    private ContactDto primaryContact;

    private GetAddressDto address;

    private SharedDetailsDto sharedDetails;

}