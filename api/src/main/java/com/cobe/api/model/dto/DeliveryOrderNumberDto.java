package com.cobe.api.model.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class DeliveryOrderNumberDto extends AbstractDto {

    private String uniqueDeliveryOrderNumber;

    private UUID transportSupplierId;
    private String transportSupplierName;

    private UUID customerId;
    private String customerName;

    private UUID cityId;
    private String cityName;

    private UUID productId;
    private String codeAS400;
}