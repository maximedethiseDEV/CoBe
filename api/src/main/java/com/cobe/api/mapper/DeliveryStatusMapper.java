package com.cobe.api.mapper;

import com.cobe.api.model.dto.DeliveryStatusDto;
import com.cobe.api.model.entity.DeliveryStatus;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface DeliveryStatusMapper {

    DeliveryStatusDto toDto(DeliveryStatus entity);

    DeliveryStatus toEntity(DeliveryStatusDto dto);

    void updateDeliveryStatusFromDto(DeliveryStatusDto dto, @MappingTarget DeliveryStatus entity);
}