package com.beco.api.model.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class PostMaterialSupplierDto extends AbstractDto {

    private UUID companyId;

    private UUID contactId;

    private UUID addressId;

    private UUID sharedDetailsId;
}