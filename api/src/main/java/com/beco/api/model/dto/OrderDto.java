package com.beco.api.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.sql.Time;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@Data
public class OrderDto extends AbstractDto {

    private Instant requestedDeliveryBegin;

    private Instant requestedDeliveryEnd;

    private Integer quantityOrdered;

    private UUID billingCustomerId;
        private String billingCustomerName;

    private UUID deliveryCustomerId;
        private String deliveryCustomerName;

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