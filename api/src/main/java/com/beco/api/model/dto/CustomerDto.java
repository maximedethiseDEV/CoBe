package com.beco.api.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@Data
public class CustomerDto {

    private UUID customerId;

    private CompanyDto company;

    private ContactDto contact;

    private SharedDetailsDto sharedDetails;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dateStart;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dateEnd;

    private Boolean isSolvent = true;

    private CustomerDto parent;

    private Instant createdDate;

    private Instant lastModifiedDate;
}