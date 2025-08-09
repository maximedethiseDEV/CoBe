package com.beco.api.model.dto;

import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
public class PostOrderDto extends AbstractDto {

    private UUID billingCustomerId;

    private UUID deliveryCustomerId;

    private UUID constructionSiteId;

    private UUID productId;

    private UUID sharedDetailsId;

    private Instant requestedDeliveryBegin;

    private Instant requestedDeliveryEnd;

    private Integer quantityOrdered;
}