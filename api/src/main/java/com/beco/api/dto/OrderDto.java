package com.beco.api.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Data
public class OrderDto {

    private Integer orderDtoId;

    @NotNull(message = "Le client a facturer doit être renseigné")
    private Integer billingCustomerId;

    private Integer deliveryCustomerId;

    @PositiveOrZero(message = "La quantité doit être supérieure ou égale à zéro")
    private Integer quantity;

    private String requestedDeliveryDate; // Format ISO (YYYY-MM-DD)

    private String requestedDeliveryTime; // Format ISO (HH:mm:ss) ou null

    @NotNull(message = "Le produit doit être renseigné")
    private Integer productId;

    private Integer shareDetailsId;
}