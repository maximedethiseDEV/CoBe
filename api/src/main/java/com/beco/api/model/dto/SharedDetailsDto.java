package com.beco.api.model.dto;

import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
public class SharedDetailsDto extends AbstractDto {

    private String attachmentPath;

    private String notes;
}