package com.beco.api.model.dto;

import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
public class ProductDto extends AbstractDto{

    private UUID materialSupplierId;

    private UUID sharedDetailsId;

    private String productCode;
}