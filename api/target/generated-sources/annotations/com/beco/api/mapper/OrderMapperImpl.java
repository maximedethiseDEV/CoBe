package com.beco.api.mapper;

import com.beco.api.model.dto.GetOrderDto;
import com.beco.api.model.dto.PostOrderDto;
import com.beco.api.model.entity.Customer;
import com.beco.api.model.entity.Order;
import com.beco.api.model.entity.Product;
import com.beco.api.model.entity.SharedDetails;
import java.time.LocalDate;
import java.time.LocalTime;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-05T22:42:20+0200",
    comments = "version: 1.6.3, compiler: javac, environment: Java 23.0.1 (Oracle Corporation)"
)
@Component
public class OrderMapperImpl implements OrderMapper {

    @Override
    public Order toEntity(PostOrderDto dto) {
        if ( dto == null ) {
            return null;
        }

        Order order = new Order();

        order.setBillingCustomer( customerFromId( dto.getBillingCustomerId() ) );
        order.setDeliveryCustomer( customerFromId( dto.getDeliveryCustomerId() ) );
        order.setProduct( productFromId( dto.getProductId() ) );
        order.setSharedDetails( sharedDetailsFromId( dto.getShareDetailsId() ) );
        order.setRequestedDeliveryDate( stringToDate( dto.getRequestedDeliveryDate() ) );
        order.setRequestedDeliveryTime( stringToTime( dto.getRequestedDeliveryTime() ) );
        order.setQuantity( dto.getQuantity() );

        return order;
    }

    @Override
    public GetOrderDto toDto(Order entity) {
        if ( entity == null ) {
            return null;
        }

        GetOrderDto getOrderDto = new GetOrderDto();

        getOrderDto.setOrderId( entity.getOrderId() );
        getOrderDto.setBillingCustomerId( entityBillingCustomerCustomerId( entity ) );
        getOrderDto.setDeliveryCustomerId( entityDeliveryCustomerCustomerId( entity ) );
        getOrderDto.setProductId( entityProductProductId( entity ) );
        getOrderDto.setShareDetailsId( entitySharedDetailsSharedDetailsId( entity ) );
        getOrderDto.setRequestedDeliveryDate( dateToString( entity.getRequestedDeliveryDate() ) );
        getOrderDto.setRequestedDeliveryTime( timeToString( entity.getRequestedDeliveryTime() ) );
        getOrderDto.setQuantity( entity.getQuantity() );

        return getOrderDto;
    }

    @Override
    public void updateOrderFromDto(PostOrderDto dto, Order order) {
        if ( dto == null ) {
            return;
        }

        if ( dto.getBillingCustomerId() != null ) {
            order.setBillingCustomer( customerFromId( dto.getBillingCustomerId() ) );
        }
        if ( dto.getDeliveryCustomerId() != null ) {
            order.setDeliveryCustomer( customerFromId( dto.getDeliveryCustomerId() ) );
        }
        if ( dto.getProductId() != null ) {
            order.setProduct( productFromId( dto.getProductId() ) );
        }
        if ( dto.getShareDetailsId() != null ) {
            order.setSharedDetails( sharedDetailsFromId( dto.getShareDetailsId() ) );
        }
        if ( dto.getRequestedDeliveryDate() != null ) {
            order.setRequestedDeliveryDate( stringToDate( dto.getRequestedDeliveryDate() ) );
        }
        if ( dto.getRequestedDeliveryTime() != null ) {
            order.setRequestedDeliveryTime( stringToTime( dto.getRequestedDeliveryTime() ) );
        }
        if ( dto.getQuantity() != null ) {
            order.setQuantity( dto.getQuantity() );
        }
    }

    private Integer entityBillingCustomerCustomerId(Order order) {
        Customer billingCustomer = order.getBillingCustomer();
        if ( billingCustomer == null ) {
            return null;
        }
        return billingCustomer.getCustomerId();
    }

    private Integer entityDeliveryCustomerCustomerId(Order order) {
        Customer deliveryCustomer = order.getDeliveryCustomer();
        if ( deliveryCustomer == null ) {
            return null;
        }
        return deliveryCustomer.getCustomerId();
    }

    private Integer entityProductProductId(Order order) {
        Product product = order.getProduct();
        if ( product == null ) {
            return null;
        }
        return product.getProductId();
    }

    private Integer entitySharedDetailsSharedDetailsId(Order order) {
        SharedDetails sharedDetails = order.getSharedDetails();
        if ( sharedDetails == null ) {
            return null;
        }
        return sharedDetails.getSharedDetailsId();
    }
}
