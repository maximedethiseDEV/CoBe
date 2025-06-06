package com.beco.api.model.dto;

import lombok.Data;

@Data
public class GetOrderDto {

    private Integer orderId;

    private Integer billingCustomerId;
    private String billingCustomerName; // Extrait pour plus de lisibilité

    private Integer deliveryCustomerId;
    private String deliveryCustomerName; // idem

    private Integer productId;
    private String productName; // Pour afficher la désignation du produit

    private Integer quantity;
    private String requestedDeliveryDate;
    private String requestedDeliveryTime;

    private Integer shareDetailsId;
}
