package com.beco.api.model.dto;

import lombok.Data;

@Data
public class MaterialSupplierDto {

    private Integer materialSupplierId;

    private CompanyDto company;

    private ContactDto contact;

    private GetAddressDto loadingAddress;

    private SharedDetailsDto sharedDetails;

}