package com.beco.api.model.dto;

import lombok.Data;

@Data
public class DeliveryDto {

    private Integer deliveryId;

    private Integer orderId;

    private Integer transportSupplierId;

    private Integer deliveryOrderNumberId;

    private String actualDeliveryDate;

    private String actualDeliveryTime;

    private Integer quantity;
}
