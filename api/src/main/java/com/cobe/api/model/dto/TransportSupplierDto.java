package com.cobe.api.model.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class TransportSupplierDto extends AbstractDto {

    private UUID companyId;
    private String companyName;
    private UUID parentId;
    private String cityName;
    private String postalCode;
    private String countryCode;

    private UUID contactId;

    private String license;
}