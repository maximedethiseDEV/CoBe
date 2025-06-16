package com.beco.api.model.dto;

import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
public class CompanyDto {

    private UUID companyId;

    private String companyName;

    private Boolean commerciallyActive = true;

    private ContactDto primaryContact;

    private GetAddressDto address;

    private SharedDetailsDto sharedDetails;

    private Instant createdDate;

    private Instant lastModifiedDate;


}