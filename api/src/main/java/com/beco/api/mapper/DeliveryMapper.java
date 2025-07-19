package com.beco.api.mapper;

import com.beco.api.model.dto.DeliveryDto;
import com.beco.api.model.entity.Delivery;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {OrderMapper.class, TransportSupplierMapper.class, DeliveryOrderNumberMapper.class, DeliveryStatusMapper.class})
public interface DeliveryMapper {

    DeliveryDto toDto(Delivery entity);

    Delivery toEntity(DeliveryDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateDeliveryFromDto(DeliveryDto dto, @MappingTarget Delivery entity);
}