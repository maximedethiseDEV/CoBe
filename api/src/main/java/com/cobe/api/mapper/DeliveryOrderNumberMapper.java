package com.cobe.api.mapper;

import com.cobe.api.model.dto.DeliveryOrderNumberDto;
import com.cobe.api.model.dto.PostDeliveryOrderNumberDto;
import com.cobe.api.model.entity.DeliveryOrderNumber;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {TransportSupplierMapper.class, CityMapper.class, ProductMapper.class})
public interface DeliveryOrderNumberMapper {

    @Mapping(source = "transportSupplier.id", target = "transportSupplierId")
    @Mapping(source = "transportSupplier.company.companyName", target = "transportSupplierName")
    @Mapping(source = "customer.id", target = "customerId")
    @Mapping(source = "customer.company.companyName", target = "customerName")
    @Mapping(source = "city.id", target = "cityId")
    @Mapping(source = "city.cityName", target = "cityName")
    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "product.codeAS400", target = "codeAS400")
    DeliveryOrderNumberDto toDto(DeliveryOrderNumber entity);

    @Mapping(source = "transportSupplierId", target = "transportSupplier.id")
    @Mapping(source = "customerId", target = "customer.id")
    @Mapping(source = "cityId", target = "city.id")
    @Mapping(source = "productId", target = "product.id")
    DeliveryOrderNumber toEntity(PostDeliveryOrderNumberDto dto);

    @Mapping(source = "transportSupplierId", target = "transportSupplier.id")
    @Mapping(source = "customerId", target = "customer.id")
    @Mapping(source = "cityId", target = "city.id")
    @Mapping(source = "productId", target = "product.id")
    void updateDeliveryOrderNumberFromDto(PostDeliveryOrderNumberDto dto, @MappingTarget DeliveryOrderNumber entity);
}