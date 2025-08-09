package com.beco.api.model.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class PostCompanyDto extends AbstractDto {

    private String companyName;

    private Boolean commerciallyActive = true;

    private UUID contactId;

    private UUID addressId;

    private UUID sharedDetailsId;

}