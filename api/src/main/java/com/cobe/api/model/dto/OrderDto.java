package com.cobe.api.model.dto;

import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
public class OrderDto extends AbstractDto {

    private Instant requestedDeliveryBegin;

    private Instant requestedDeliveryEnd;

    private Integer quantityOrdered;

    private UUID customerId;
        private String customerName;

    private UUID constructionSiteId;
        private String constructionSiteCustomerName;
        private String constructionSiteStreet;
        private String constructionSiteCityName;
        private String constructionSitePostalCode;
        private String constructionSiteCountryCode;

    private UUID productId;
        private String code;
        private String name;
        private String materialSupplierName;

    private UUID sharedDetailsId;
}