package com.beco.api.model.dto;

import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
public class MaterialSupplierDto {

    private UUID id;

    private CompanyDto company;

    private ContactDto contact;

    private GetAddressDto loadingAddress;

    private SharedDetailsDto sharedDetails;

    private Instant createdDate;

    private Instant lastModifiedDate;

}