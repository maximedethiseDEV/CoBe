package com.beco.api.mapper;

import com.beco.api.model.dto.ConstructionSiteDto;
import com.beco.api.model.entity.ConstructionSite;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {CustomerMapper.class, AddressMapper.class})
public interface ConstructionSiteMapper {

    ConstructionSiteDto toDto(ConstructionSite entity);

    ConstructionSite toEntity(ConstructionSiteDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateConstructionSiteFromDto(ConstructionSiteDto dto, @MappingTarget ConstructionSite entity);
}