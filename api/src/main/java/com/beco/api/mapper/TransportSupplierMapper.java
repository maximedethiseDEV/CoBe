package com.beco.api.mapper;

import com.beco.api.model.dto.TransportSupplierDto;
import com.beco.api.model.entity.TransportSupplier;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {CompanyMapper.class})
public interface TransportSupplierMapper {

    @Mapping(target = "transportSupplierId", ignore = true)
    @Mapping(target = "company", source = "company")
    @Mapping(target = "licenseNumber", source = "licenseNumber")
    @Mapping(target = "createdDate", source = "createdDate")
    @Mapping(target = "lastModifiedDate", source = "lastModifiedDate")
    TransportSupplierDto toDto(TransportSupplier entity);

    @Mapping(target = "transportSupplierId", ignore = true)
    @Mapping(target = "company", source = "company")
    @Mapping(target = "licenseNumber", source = "licenseNumber")
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    TransportSupplier toEntity(TransportSupplierDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "transportSupplierId", ignore = true)
    void updateTransportSupplierFromDto(TransportSupplierDto dto, @MappingTarget TransportSupplier entity);
}