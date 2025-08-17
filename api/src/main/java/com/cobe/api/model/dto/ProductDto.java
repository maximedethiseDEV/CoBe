package com.cobe.api.model.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class ProductDto extends AbstractDto{

    private String code;
    private String name;

    private UUID materialSupplierId;
        private String companyName;

    private UUID sharedDetailsId;
}