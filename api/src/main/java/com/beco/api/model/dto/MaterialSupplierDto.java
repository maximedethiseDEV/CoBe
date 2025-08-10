package com.beco.api.model.dto;

import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
public class MaterialSupplierDto extends AbstractDto {

    private UUID companyId;
        private String companyName;
        private UUID parentId;

    private UUID contactId;

    private UUID addressId;
        private String cityName;
        private String postalCode;
        private String countryCode;

    private UUID sharedDetailsId;
}