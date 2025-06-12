package com.beco.api.mapper;

import com.beco.api.model.dto.ConstructionSiteDto;
import com.beco.api.model.entity.ConstructionSite;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {CustomerMapper.class, AddressMapper.class})
public interface ConstructionSiteMapper {

    @Mapping(target = "constructionSiteId", source = "constructionSiteId")
    @Mapping(target = "constructionSiteCustomer", source = "constructionSiteCustomer")
    @Mapping(target = "constructionSiteAddress", source = "constructionSiteAddress")
    @Mapping(target = "sharedDetails", source = "sharedDetails")
    @Mapping(target = "dateStart", source = "dateStart")
    @Mapping(target = "dateEnd", source = "dateEnd")
    ConstructionSiteDto toDto(ConstructionSite entity);

    @Mapping(target = "constructionSiteId", ignore = true)
    @Mapping(target = "constructionSiteCustomer", source = "constructionSiteCustomer")
    @Mapping(target = "constructionSiteAddress", source = "constructionSiteAddress")
    @Mapping(target = "sharedDetails", source = "sharedDetails")
    @Mapping(target = "dateStart", source = "dateStart")
    @Mapping(target = "dateEnd", source = "dateEnd")
    ConstructionSite toEntity(ConstructionSiteDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "constructionSiteId", ignore = true)
    void updateConstructionSiteFromDto(ConstructionSiteDto dto, @MappingTarget ConstructionSite entity);
}