package com.beco.api.model.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class PostDeliveryOrderNumberDto extends AbstractDto {

    private UUID transportSupplierId;

    private UUID customerId;

    private UUID cityId;

    private UUID productId;

    private String uniqueDeliveryOrderNumber;
}