package com.beco.api.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class ConstructionSiteDto {

    private Integer constructionSiteId;

    private CustomerDto constructionSiteCustomer;

    private GetAddressDto constructionSiteAddress;

    private SharedDetailsDto sharedDetails;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dateStart;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dateEnd;
}