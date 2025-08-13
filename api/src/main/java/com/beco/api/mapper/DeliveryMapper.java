package com.beco.api.mapper;

import com.beco.api.model.dto.DeliveryDto;
import com.beco.api.model.dto.PostDeliveryDto;
import com.beco.api.model.entity.Delivery;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {BaseMapper.class, OrderMapper.class, TransportSupplierMapper.class, DeliveryOrderNumberMapper.class, DeliveryStatusMapper.class})
public interface DeliveryMapper {

    @Mapping(source = "order.id", target = "orderId")
    @Mapping(source = "transportSupplier.id", target = "transportSupplierId")
    @Mapping(source = "deliveryOrderNumber.id", target = "deliveryOrderNumberId")
    @Mapping(source = "status.id", target = "statusId")
    DeliveryDto toDto(Delivery entity);

    @Mapping(source = "orderId", target = "order.id")
    @Mapping(source = "transportSupplierId", target = "transportSupplier.id")
    @Mapping(source = "deliveryOrderNumberId", target = "deliveryOrderNumber", qualifiedByName = "mapDeliveryOrderNumberIdToDeliveryOrderNumber")
    @Mapping(source = "statusId", target = "status.id")
    Delivery toEntity(PostDeliveryDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateDeliveryFromDto(PostDeliveryDto dto, @MappingTarget Delivery entity);
}