package com.beco.api.mapper;

import com.beco.api.model.dto.DeliveryOrderNumberDto;
import com.beco.api.model.entity.DeliveryOrderNumber;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {TransportSupplierMapper.class, CityMapper.class, ProductMapper.class})
public interface DeliveryOrderNumberMapper {

    @Mapping(target = "deliveryOrderNumberId", source = "deliveryOrderNumberId")
    @Mapping(target = "transportSupplier", source = "transportSupplier")
    @Mapping(target = "city", source = "city")
    @Mapping(target = "product", source = "product")
    @Mapping(target = "uniqueDeliveryOrderNumber", source = "uniqueDeliveryOrderNumber")
    DeliveryOrderNumberDto toDto(DeliveryOrderNumber entity);

    @Mapping(target = "deliveryOrderNumberId", ignore = true)
    @Mapping(target = "transportSupplier", source = "transportSupplier")
    @Mapping(target = "city", source = "city")
    @Mapping(target = "product", source = "product")
    @Mapping(target = "uniqueDeliveryOrderNumber", source = "uniqueDeliveryOrderNumber")
    DeliveryOrderNumber toEntity(DeliveryOrderNumberDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "deliveryOrderNumberId", ignore = true)
    void updateDeliveryOrderNumberFromDto(DeliveryOrderNumberDto dto, @MappingTarget DeliveryOrderNumber entity);
}