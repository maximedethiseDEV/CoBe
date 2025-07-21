package com.beco.api.model.dto;

import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
public class TransportSupplierDto extends AbstractDto {

    private UUID companyId;

    private String license;
}