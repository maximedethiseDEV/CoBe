package com.beco.api.model.dto;

import com.beco.api.model.entity.City;
import com.beco.api.model.entity.Product;
import com.beco.api.model.entity.TransportSupplier;
import jakarta.persistence.*;
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
    private String code;
}