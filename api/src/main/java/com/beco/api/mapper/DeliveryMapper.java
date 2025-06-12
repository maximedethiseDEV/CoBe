package com.beco.api.mapper;

import com.beco.api.model.dto.DeliveryDto;
import com.beco.api.model.entity.Delivery;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {OrderMapper.class, TransportSupplierMapper.class, DeliveryOrderNumberMapper.class, DeliveryStatusMapper.class})
public interface DeliveryMapper {

    @Mapping(target = "deliveryId", source = "deliveryId")
    @Mapping(target = "order", source = "order")
    @Mapping(target = "transportSupplier", source = "transportSupplier")
    @Mapping(target = "deliveryOrderNumber", source = "deliveryOrderNumber")
    @Mapping(target = "actualDeliveryDate", source = "actualDeliveryDate")
    @Mapping(target = "actualDeliveryTime", source = "actualDeliveryTime")
    @Mapping(target = "quantity", source = "quantity")
    @Mapping(target = "status", source = "status")
    DeliveryDto toDto(Delivery entity);

    @Mapping(target = "deliveryId", ignore = true)
    @Mapping(target = "order", source = "order")
    @Mapping(target = "transportSupplier", source = "transportSupplier")
    @Mapping(target = "deliveryOrderNumber", source = "deliveryOrderNumber")
    @Mapping(target = "actualDeliveryDate", source = "actualDeliveryDate")
    @Mapping(target = "actualDeliveryTime", source = "actualDeliveryTime")
    @Mapping(target = "quantity", source = "quantity")
    @Mapping(target = "status", source = "status")
    Delivery toEntity(DeliveryDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "deliveryId", ignore = true)
    void updateDeliveryFromDto(DeliveryDto dto, @MappingTarget Delivery entity);
}