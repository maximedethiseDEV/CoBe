package com.beco.api.model.dto;

import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
public class GetAddressDto extends AbstractDto {

    private String street;

    private UUID cityId;
}