package com.beco.api.model.dto;

import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
public class PostAddressDto {

    private UUID id;

    private String street;

    private UUID cityId;
}