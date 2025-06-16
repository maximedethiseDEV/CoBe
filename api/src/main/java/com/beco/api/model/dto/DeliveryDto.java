package com.beco.api.model.dto;

import com.beco.api.model.entity.DeliveryStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Data;

import java.sql.Time;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@Data
public class DeliveryDto {

    private UUID deliveryId;

    private OrderDto order;

    private TransportSupplierDto transportSupplier;

    private DeliveryOrderNumberDto deliveryOrderNumber;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date actualDeliveryDate;

    private Time actualDeliveryTime;

    private Integer quantity;

    private DeliveryStatusDto status;

    private Instant createdDate;

    private Instant lastModifiedDate;
}