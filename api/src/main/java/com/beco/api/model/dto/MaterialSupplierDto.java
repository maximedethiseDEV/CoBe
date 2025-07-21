package com.beco.api.model.dto;

import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
public class MaterialSupplierDto extends AbstractDto {

    private UUID companyId;

    private UUID contactId;

    private UUID addressId;

    private UUID sharedDetailsId;
}