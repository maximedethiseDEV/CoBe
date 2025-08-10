package com.beco.api.mapper;

import com.beco.api.model.dto.PostTransportSupplierDto;
import com.beco.api.model.dto.TransportSupplierDto;
import com.beco.api.model.entity.TransportSupplier;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {CompanyMapper.class})
public interface TransportSupplierMapper {

    @Mapping(source = "company.id", target = "companyId")
    @Mapping(source = "company.companyName", target = "companyName")
    @Mapping(source = "company.address.city.cityName", target = "cityName")
    @Mapping(source = "company.address.city.postalCode", target = "postalCode")
    @Mapping(source = "company.address.city.country.countryCode", target = "countryCode")
    TransportSupplierDto toDto(TransportSupplier entity);

    @Mapping(source = "companyId", target = "company.id")
    TransportSupplier toEntity(PostTransportSupplierDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateTransportSupplierFromDto(PostTransportSupplierDto dto, @MappingTarget TransportSupplier entity);
}