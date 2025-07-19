package com.beco.api.mapper;

import com.beco.api.model.dto.DeliveryOrderNumberDto;
import com.beco.api.model.entity.DeliveryOrderNumber;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {TransportSupplierMapper.class, CityMapper.class, ProductMapper.class})
public interface DeliveryOrderNumberMapper {

    DeliveryOrderNumberDto toDto(DeliveryOrderNumber entity);

    DeliveryOrderNumber toEntity(DeliveryOrderNumberDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateDeliveryOrderNumberFromDto(DeliveryOrderNumberDto dto, @MappingTarget DeliveryOrderNumber entity);
}