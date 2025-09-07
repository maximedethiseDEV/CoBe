package com.cobe.api.model.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class PostTransportSupplierDto extends AbstractDto {

    private UUID companyId;

    private UUID contactId;

    private UUID sharedDetailsId;

    private String license;
}