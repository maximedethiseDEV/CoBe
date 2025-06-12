package com.beco.api.model.dto;

import com.beco.api.model.entity.Address;
import com.beco.api.model.entity.Customer;
import com.beco.api.model.entity.Product;
import com.beco.api.model.entity.SharedDetails;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.sql.Time;
import java.util.Date;

@Data
public class OrderDto {

    private Integer orderId;

    private CustomerDto billingCustomer;

    private CustomerDto deliveryCustomer;

    private GetAddressDto constructionSiteId;

    private Integer quantityOrdered;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date requestedDeliveryDate;

    private Time requestedDeliveryTime;

    private ProductDto product;

    private SharedDetails sharedDetails;
}