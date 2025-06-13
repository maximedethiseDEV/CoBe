package com.beco.api.model.dto;

import lombok.Data;

@Data
public class SharedDetailsDto {

    private Integer sharedDetailsId;

    private String attachmentPath;

    private String notes;
}