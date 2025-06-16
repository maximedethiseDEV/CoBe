package com.beco.api.model.dto;

import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
public class TransportSupplierDto {

    private UUID transportSupplierId;

    private CompanyDto company;

    private String licenseNumber;

    private Instant createdDate;

    private Instant lastModifiedDate;
}