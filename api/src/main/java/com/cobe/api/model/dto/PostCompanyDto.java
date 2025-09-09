package com.cobe.api.model.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class PostCompanyDto extends AbstractDto {

    private String companyName;
    private Boolean commerciallyActive = true;
    private String codeSAP;
    private String codeAS400;

    private UUID parentId;

    private UUID addressId;

    private UUID sharedDetailsId;

}