package com.beco.api.mapper;

import com.beco.api.dto.OrderDto;
import com.beco.api.model.Customer;
import com.beco.api.model.Order;
import com.beco.api.model.Product;
import com.beco.api.model.SharedDetails;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-05-28T14:50:14+0200",
    comments = "version: 1.6.3, compiler: javac, environment: Java 23.0.1 (Oracle Corporation)"
)
@Component
public class OrderMapperImpl implements OrderMapper {

    @Override
    public Order toEntity(OrderDto dto) {
        if ( dto == null ) {
            return null;
        }

        Order order = new Order();

        order.setBillingCustomer( customerFromId( dto.getBillingCustomerId() ) );
        order.setDeliveryCustomer( customerFromId( dto.getDeliveryCustomerId() ) );
        order.setProduct( productFromId( dto.getProductId() ) );
        order.setQuantity( dto.getQuantity() );
        order.setSharedDetails( sharedDetailsFromId( dto.getShareDetailsId() ) );
        order.setRequestedDeliveryDate( stringToDate( dto.getRequestedDeliveryDate() ) );
        order.setRequestedDeliveryTime( stringToTime( dto.getRequestedDeliveryTime() ) );

        return order;
    }

    @Override
    public OrderDto toDto(Order entity) {
        if ( entity == null ) {
            return null;
        }

        OrderDto orderDto = new OrderDto();

        orderDto.setOrderDtoId( entity.getOrderId() );
        orderDto.setBillingCustomerId( entityBillingCustomerCustomerId( entity ) );
        orderDto.setDeliveryCustomerId( entityDeliveryCustomerCustomerId( entity ) );
        orderDto.setProductId( entityProductProductId( entity ) );
        orderDto.setQuantity( entity.getQuantity() );
        orderDto.setShareDetailsId( entitySharedDetailsSharedDetailsId( entity ) );
        orderDto.setRequestedDeliveryDate( dateToString( entity.getRequestedDeliveryDate() ) );
        orderDto.setRequestedDeliveryTime( timeToString( entity.getRequestedDeliveryTime() ) );

        return orderDto;
    }

    @Override
    public void updateOrderFromDto(OrderDto dto, Order order) {
        if ( dto == null ) {
            return;
        }

        if ( dto.getQuantity() != null ) {
            order.setQuantity( dto.getQuantity() );
        }
        if ( dto.getRequestedDeliveryDate() != null ) {
            order.setRequestedDeliveryDate( LocalDate.parse( dto.getRequestedDeliveryDate() ) );
        }
        if ( dto.getRequestedDeliveryTime() != null ) {
            order.setRequestedDeliveryTime( LocalTime.parse( dto.getRequestedDeliveryTime() ) );
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
