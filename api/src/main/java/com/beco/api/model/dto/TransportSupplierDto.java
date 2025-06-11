package com.beco.api.model.dto;

import lombok.Data;

@Data
public class TransportSupplierDto {

    private Integer transportSupplierId;

    private CompanyDto company;

    private String licenseNumber;

}