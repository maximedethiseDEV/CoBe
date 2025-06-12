package com.beco.api.mapper;

import com.beco.api.model.dto.DeliveryStatusDto;
import com.beco.api.model.entity.DeliveryStatus;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface DeliveryStatusMapper {

    @Mapping(target = "statusId", source = "statusId")
    @Mapping(target = "status", source = "status")
    DeliveryStatusDto toDto(DeliveryStatus entity);

    @Mapping(target = "statusId", source = "statusId")
    @Mapping(target = "status", source = "status")
    DeliveryStatus toEntity(DeliveryStatusDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "statusId", ignore = true)
    void updateDeliveryStatusFromDto(DeliveryStatusDto dto, @MappingTarget DeliveryStatus entity);
}