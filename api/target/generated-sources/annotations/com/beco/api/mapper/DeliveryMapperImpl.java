package com.beco.api.mapper;

import com.beco.api.model.dto.DeliveryDto;
import com.beco.api.model.entity.Delivery;
import com.beco.api.model.entity.DeliveryOrderNumber;
import com.beco.api.model.entity.Order;
import com.beco.api.model.entity.TransportSupplier;
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
public class DeliveryMapperImpl implements DeliveryMapper {

    @Override
    public Delivery toEntity(DeliveryDto dto) {
        if ( dto == null ) {
            return null;
        }

        Delivery delivery = new Delivery();

        delivery.setDeliveryId( dto.getDeliveryId() );
        delivery.setQuantity( dto.getQuantity() );

        delivery.setOrder( mapOrderId(dto.getOrderId()) );
        delivery.setTransportSupplier( mapTransportSupplierId(dto.getTransportSupplierId()) );
        delivery.setDeliveryOrderNumber( mapDeliveryOrderNumberId(dto.getDeliveryOrderNumberId()) );
        delivery.setActualDeliveryDate( dto.getActualDeliveryDate() != null ? LocalDate.parse(dto.getActualDeliveryDate()) : null );
        delivery.setActualDeliveryTime( dto.getActualDeliveryTime() != null ? LocalTime.parse(dto.getActualDeliveryTime()) : null );

        return delivery;
    }

    @Override
    public DeliveryDto toDto(Delivery entity) {
        if ( entity == null ) {
            return null;
        }

        DeliveryDto deliveryDto = new DeliveryDto();

        deliveryDto.setOrderId( entityOrderOrderId( entity ) );
        deliveryDto.setTransportSupplierId( entityTransportSupplierTransportSupplierId( entity ) );
        deliveryDto.setDeliveryOrderNumberId( entityDeliveryOrderNumberDeliveryOrderNumberId( entity ) );
        deliveryDto.setDeliveryId( entity.getDeliveryId() );
        deliveryDto.setQuantity( entity.getQuantity() );

        deliveryDto.setActualDeliveryDate( entity.getActualDeliveryDate() != null ? entity.getActualDeliveryDate().toString() : null );
        deliveryDto.setActualDeliveryTime( entity.getActualDeliveryTime() != null ? entity.getActualDeliveryTime().toString() : null );

        return deliveryDto;
    }

    @Override
    public void updateDeliveryFromDto(DeliveryDto dto, Delivery delivery) {
        if ( dto == null ) {
            return;
        }

        if ( dto.getQuantity() != null ) {
            delivery.setQuantity( dto.getQuantity() );
        }

        delivery.setOrder( dto.getOrderId() != null ? mapOrderId(dto.getOrderId()) : delivery.getOrder() );
        delivery.setTransportSupplier( dto.getTransportSupplierId() != null ? mapTransportSupplierId(dto.getTransportSupplierId()) : delivery.getTransportSupplier() );
        delivery.setDeliveryOrderNumber( dto.getDeliveryOrderNumberId() != null ? mapDeliveryOrderNumberId(dto.getDeliveryOrderNumberId()) : delivery.getDeliveryOrderNumber() );
        delivery.setActualDeliveryDate( dto.getActualDeliveryDate() != null ? LocalDate.parse(dto.getActualDeliveryDate()) : delivery.getActualDeliveryDate() );
        delivery.setActualDeliveryTime( dto.getActualDeliveryTime() != null ? LocalTime.parse(dto.getActualDeliveryTime()) : delivery.getActualDeliveryTime() );
    }

    private Integer entityOrderOrderId(Delivery delivery) {
        Order order = delivery.getOrder();
        if ( order == null ) {
            return null;
        }
        return order.getOrderId();
    }

    private Integer entityTransportSupplierTransportSupplierId(Delivery delivery) {
        TransportSupplier transportSupplier = delivery.getTransportSupplier();
        if ( transportSupplier == null ) {
            return null;
        }
        return transportSupplier.getTransportSupplierId();
    }

    private Integer entityDeliveryOrderNumberDeliveryOrderNumberId(Delivery delivery) {
        DeliveryOrderNumber deliveryOrderNumber = delivery.getDeliveryOrderNumber();
        if ( deliveryOrderNumber == null ) {
            return null;
        }
        return deliveryOrderNumber.getDeliveryOrderNumberId();
    }
}
