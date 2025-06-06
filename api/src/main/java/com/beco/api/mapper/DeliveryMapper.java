package com.beco.api.mapper;

import com.beco.api.model.dto.DeliveryDto;
import com.beco.api.model.entity.Delivery;
import com.beco.api.model.entity.DeliveryOrderNumber;
import com.beco.api.model.entity.Order;
import com.beco.api.model.entity.TransportSupplier;
import org.mapstruct.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Mapper(componentModel = "spring", imports = {LocalDate.class, LocalTime.class})
public interface DeliveryMapper {

    /** DTO -> ENTITY **/
    @Mapping(target = "deliveryId", source = "deliveryId")
    @Mapping(target = "order", expression = "java(mapOrderId(dto.getOrderId()))")
    @Mapping(target = "transportSupplier", expression = "java(mapTransportSupplierId(dto.getTransportSupplierId()))")
    @Mapping(target = "deliveryOrderNumber", expression = "java(mapDeliveryOrderNumberId(dto.getDeliveryOrderNumberId()))")
    @Mapping(target = "actualDeliveryDate", expression = "java(dto.getActualDeliveryDate() != null ? LocalDate.parse(dto.getActualDeliveryDate()) : null)")
    @Mapping(target = "actualDeliveryTime", expression = "java(dto.getActualDeliveryTime() != null ? LocalTime.parse(dto.getActualDeliveryTime()) : null)")
    Delivery toEntity(DeliveryDto dto);

    /** ENTITY -> DTO **/
    @Mapping(target = "orderId", source = "order.orderId")
    @Mapping(target = "transportSupplierId", source = "transportSupplier.transportSupplierId")
    @Mapping(target = "deliveryOrderNumberId", source = "deliveryOrderNumber.deliveryOrderNumberId")
    @Mapping(target = "actualDeliveryDate", expression = "java(entity.getActualDeliveryDate() != null ? entity.getActualDeliveryDate().toString() : null)")
    @Mapping(target = "actualDeliveryTime", expression = "java(entity.getActualDeliveryTime() != null ? entity.getActualDeliveryTime().toString() : null)")
    DeliveryDto toDto(Delivery entity);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "deliveryId", ignore = true)
    @Mapping(target = "order", expression = "java(dto.getOrderId() != null ? mapOrderId(dto.getOrderId()) : delivery.getOrder())")
    @Mapping(target = "transportSupplier", expression = "java(dto.getTransportSupplierId() != null ? mapTransportSupplierId(dto.getTransportSupplierId()) : delivery.getTransportSupplier())")
    @Mapping(target = "deliveryOrderNumber", expression = "java(dto.getDeliveryOrderNumberId() != null ? mapDeliveryOrderNumberId(dto.getDeliveryOrderNumberId()) : delivery.getDeliveryOrderNumber())")
    @Mapping(target = "actualDeliveryDate", expression = "java(dto.getActualDeliveryDate() != null ? LocalDate.parse(dto.getActualDeliveryDate()) : delivery.getActualDeliveryDate())")
    @Mapping(target = "actualDeliveryTime", expression = "java(dto.getActualDeliveryTime() != null ? LocalTime.parse(dto.getActualDeliveryTime()) : delivery.getActualDeliveryTime())")
    void updateDeliveryFromDto(DeliveryDto dto, @MappingTarget Delivery delivery);

    default Order mapOrderId(Integer id) {
        if (id == null) return null;
        Order order = new Order();
        order.setOrderId(id);
        return order;
    }

    default TransportSupplier mapTransportSupplierId(Integer id) {
        if (id == null) return null;
        TransportSupplier supplier = new TransportSupplier();
        supplier.setTransportSupplierId(id);
        return supplier;
    }

    default DeliveryOrderNumber mapDeliveryOrderNumberId(Integer id) {
        if (id == null) return null;
        DeliveryOrderNumber don = new DeliveryOrderNumber();
        don.setDeliveryOrderNumberId(id);
        return don;
    }
}
