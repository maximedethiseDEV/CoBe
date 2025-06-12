package com.beco.api.model.dto;

import com.beco.api.model.entity.SharedDetails;
import lombok.Data;

@Data
public class ProductDto {

    private Integer productId;

    private String productCode;

    private MaterialSupplierDto materialSupplier;

    private SharedDetails sharedDetails;
}