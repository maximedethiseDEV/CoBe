package com.beco.api.mapper;

import com.beco.api.model.dto.MaterialSupplierDto;
import com.beco.api.model.entity.MaterialSupplier;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {CompanyMapper.class, ContactMapper.class, AddressMapper.class})
public interface MaterialSupplierMapper {

    MaterialSupplierDto toDto(MaterialSupplier entity);

    MaterialSupplier toEntity(MaterialSupplierDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateMaterialSupplierFromDto(MaterialSupplierDto dto, @MappingTarget MaterialSupplier entity);
}