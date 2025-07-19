package com.beco.api.model.dto;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class DeliveryStatusDto {

    private Integer id;

    private String status;
}