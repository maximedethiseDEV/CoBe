package com.beco.api.model.dto;

import com.beco.api.model.entity.City;
import com.beco.api.model.entity.Product;
import com.beco.api.model.entity.TransportSupplier;
import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Data
public class DeliveryOrderNumberDto extends AbstractDto {

    private UUID transportSupplierId;

    private UUID customerId;

    private UUID cityId;

    private UUID productId;

    private String uniqueDeliveryOrderNumber;
}