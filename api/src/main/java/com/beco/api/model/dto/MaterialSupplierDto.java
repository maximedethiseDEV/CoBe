package com.beco.api.model.dto;

import com.beco.api.model.entity.SharedDetails;
import lombok.Data;

@Data
public class MaterialSupplierDto {

    private Integer materialSupplierId;

    private CompanyDto company;

    private ContactDto contact;

    private GetAddressDto loadingAddress;

    private SharedDetails sharedDetails;

}