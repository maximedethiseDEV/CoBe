package com.beco.api.mapper;

import com.beco.api.model.dto.DeliveryStatusDto;
import com.beco.api.model.entity.DeliveryStatus;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface DeliveryStatusMapper {

    DeliveryStatusDto toDto(DeliveryStatus entity);

    DeliveryStatus toEntity(DeliveryStatusDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateDeliveryStatusFromDto(DeliveryStatusDto dto, @MappingTarget DeliveryStatus entity);
}