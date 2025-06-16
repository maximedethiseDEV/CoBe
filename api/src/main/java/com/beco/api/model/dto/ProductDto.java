package com.beco.api.model.dto;

import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
public class ProductDto {

    private UUID productId;

    private String productCode;

    private MaterialSupplierDto materialSupplier;

    private SharedDetailsDto sharedDetails;

    private Instant createdDate;

    private Instant lastModifiedDate;
}