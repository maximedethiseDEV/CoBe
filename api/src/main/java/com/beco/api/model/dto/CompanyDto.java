package com.beco.api.model.dto;

import com.beco.api.model.entity.Address;
import com.beco.api.model.entity.Contact;
import com.beco.api.model.entity.SharedDetails;
import lombok.Data;

@Data
public class CompanyDto {

    private Integer companyId;

    private String companyName;

    private Boolean commerciallyActive = true;

    private ContactDto primaryContact;

    private GetAddressDto address;

    private SharedDetails sharedDetails;

}