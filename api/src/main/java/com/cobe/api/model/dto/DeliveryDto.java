package com.cobe.api.model.dto;

import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
public class DeliveryDto extends AbstractDto {

    private UUID orderId;

    private UUID transportSupplierId;

    private UUID deliveryOrderNumberId;

    private UUID sharedDetailsId;

    private UUID statusId;

    private Integer quantity;

    private Instant actualDeliveryBegin;

    private Instant actualDeliveryEnd;
}