package com.beco.api.model.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class PostProductDto extends AbstractDto{

    private String code;
    private String name;

    private UUID materialSupplierId;

    private UUID sharedDetailsId;
}