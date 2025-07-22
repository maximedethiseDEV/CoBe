package com.beco.api.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.sql.Time;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@Data
public class OrderDto extends AbstractDto {

    private UUID billingCustomerId;

    private UUID deliveryCustomerId;

    private UUID constructionSiteId;

    private UUID productId;

    private UUID sharedDetailsId;

    private Instant requestedDeliveryBegin;

    private Instant requestedDeliveryEnd;

    private Integer quantityOrdered;
}