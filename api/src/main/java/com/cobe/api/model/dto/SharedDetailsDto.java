package com.cobe.api.model.dto;

import lombok.Data;

@Data
public class SharedDetailsDto extends AbstractDto {

    private String label;

    private String fileName;

    private String notes;
}