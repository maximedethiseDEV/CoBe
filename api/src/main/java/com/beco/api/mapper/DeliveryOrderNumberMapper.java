package com.beco.api.mapper;

import com.beco.api.model.dto.DeliveryOrderNumberDto;
import com.beco.api.model.entity.DeliveryOrderNumber;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {TransportSupplierMapper.class, CityMapper.class, ProductMapper.class})
public interface DeliveryOrderNumberMapper {

    @Mapping(source = "transportSupplier.id", target = "transportSupplierId")
    @Mapping(source = "customer.id", target = "customerId")
    @Mapping(source = "city.id", target = "cityId")
    @Mapping(source = "product.id", target = "productId")
    DeliveryOrderNumberDto toDto(DeliveryOrderNumber entity);

    @Mapping(source = "transportSupplierId", target = "transportSupplier.id")
    @Mapping(source = "customerId", target = "customer.id")
    @Mapping(source = "cityId", target = "city.id")
    @Mapping(source = "productId", target = "product.id")
    DeliveryOrderNumber toEntity(DeliveryOrderNumberDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateDeliveryOrderNumberFromDto(DeliveryOrderNumberDto dto, @MappingTarget DeliveryOrderNumber entity);
}