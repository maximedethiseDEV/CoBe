package com.beco.api.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.sql.Time;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@Data
public class OrderDto {

    private UUID orderId;

    private CustomerDto billingCustomer;

    private CustomerDto deliveryCustomer;

    private GetAddressDto constructionSiteId;

    private Integer quantityOrdered;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date requestedDeliveryDate;

    private Time requestedDeliveryTime;

    private ProductDto product;

    private SharedDetailsDto sharedDetails;

    private Instant createdDate;

    private Instant lastModifiedDate;
}