package com.beco.api.model.dto;

import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
public class SharedDetailsDto {

    private UUID sharedDetailsId;

    private String attachmentPath;

    private String notes;

    private Instant createdDate;

    private Instant lastModifiedDate;
}