package com.cobe.api.model.dto;

import jakarta.persistence.Column;
import lombok.Data;

import java.util.UUID;

@Data
public class ProductDto extends AbstractDto{

    private String codeAS400;
    private String codeSAP;
    private String nameShort;
    private String nameLong;
    private String category;
    private Boolean isValid;

    private UUID materialSupplierId;
        private String companyName;

    private UUID sharedDetailsId;
}