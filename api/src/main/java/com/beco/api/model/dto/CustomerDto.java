package com.beco.api.model.dto;

import lombok.Data;

@Data
public class CustomerDto {

    private Integer customerId;

    private String compagnyName;

    private Integer companyId;

    private Integer contactId;

    private Integer deliveryAddressId;

    private String attachmentPath;

    private String notes;

    private String dateStart;

    private String dateEnd;

    private Boolean isSolvent;

    private Integer parentId;
}