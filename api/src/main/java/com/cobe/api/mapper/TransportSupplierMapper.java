package com.cobe.api.mapper;

import com.cobe.api.model.dto.PostTransportSupplierDto;
import com.cobe.api.model.dto.TransportSupplierDto;
import com.cobe.api.model.entity.TransportSupplier;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {BaseMapper.class, CompanyMapper.class})
public interface TransportSupplierMapper {

    @Mapping(source = "company.id", target = "companyId")
    @Mapping(source = "company.companyName", target = "companyName")
    @Mapping(source = "company.address.city.cityName", target = "cityName")
    @Mapping(source = "company.address.city.postalCode", target = "postalCode")
    @Mapping(source = "company.address.city.country.countryCode", target = "countryCode")
    @Mapping(source = "sharedDetails.id", target = "sharedDetailsId")
    TransportSupplierDto toDto(TransportSupplier entity);

    @Mapping(source = "companyId", target = "company.id")
    @Mapping(source = "contactId", target = "contact", qualifiedByName = "mapContactIdToContact")
    @Mapping(source = "sharedDetailsId", target = "sharedDetails", qualifiedByName = "mapSharedDetailsIdToSharedDetails")
    TransportSupplier toEntity(PostTransportSupplierDto dto);

    @Mapping(source = "companyId", target = "company.id")
    @Mapping(source = "contactId", target = "contact", qualifiedByName = "mapContactIdToContact")
    @Mapping(source = "sharedDetailsId", target = "sharedDetails", qualifiedByName = "mapSharedDetailsIdToSharedDetails")
    void updateTransportSupplierFromDto(PostTransportSupplierDto dto, @MappingTarget TransportSupplier entity);
}