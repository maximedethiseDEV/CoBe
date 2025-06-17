package com.beco.api.model.dto;

import com.beco.api.model.entity.City;
import com.beco.api.model.entity.Product;
import com.beco.api.model.entity.TransportSupplier;
import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Data
public class DeliveryOrderNumberDto {

    private UUID deliveryOrderNumberId;

    private TransportSupplierDto transportSupplier;

    private CustomerDto customer;

    private CityDto city;

    private ProductDto product;

    private String uniqueDeliveryOrderNumber;
}