package com.beco.api.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.sql.Time;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@Data
public class DeliveryDto extends AbstractDto {

    private UUID orderId;

    private UUID transportSupplierId;

    private UUID deliveryOrderNumberId;

    private UUID statusId;

    private Integer quantity;

    private Instant actualDeliveryBegin;

    private Instant actualDeliveryEnd;
}