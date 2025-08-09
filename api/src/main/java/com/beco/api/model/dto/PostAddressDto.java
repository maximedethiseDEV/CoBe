package com.beco.api.model.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class PostAddressDto extends AbstractDto {

    private String street;

    private UUID cityId;
}