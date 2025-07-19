package com.beco.api.mapper;

import com.beco.api.model.dto.TransportSupplierDto;
import com.beco.api.model.entity.TransportSupplier;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {CompanyMapper.class})
public interface TransportSupplierMapper {

    TransportSupplierDto toDto(TransportSupplier entity);

    TransportSupplier toEntity(TransportSupplierDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateTransportSupplierFromDto(TransportSupplierDto dto, @MappingTarget TransportSupplier entity);
}