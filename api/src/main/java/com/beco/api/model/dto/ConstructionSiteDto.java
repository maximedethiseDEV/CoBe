package com.beco.api.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@Data
public class ConstructionSiteDto {

    private UUID constructionSiteId;

    private CustomerDto constructionSiteCustomer;

    private GetAddressDto constructionSiteAddress;

    private SharedDetailsDto sharedDetails;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dateStart;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dateEnd;

    private Instant createdDate;

    private Instant lastModifiedDate;
}