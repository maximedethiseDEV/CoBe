package com.beco.api.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class OrderDto {

    private Integer orderDtoId;

    @NotNull
    private Integer billingCustomerId;

    private Integer deliveryCustomerId;

    @NotNull
    private Integer quantity;

    private String requestedDeliveryDate; // Format ISO (YYYY-MM-DD)

    private String requestedDeliveryTime; // Format ISO (HH:mm:ss) ou null

    @NotNull
    private Integer productId;

    private Integer shareDetailsId;
}