package com.beco.api.model.dto;

import lombok.Data;

@Data
public class ProductDto {

    private Integer productId;

    private String productCode;

    private MaterialSupplierDto materialSupplier;

    private SharedDetailsDto sharedDetails;
}