package com.cobe.api.mapper;

import com.cobe.api.model.dto.MaterialSupplierDto;
import com.cobe.api.model.dto.PostMaterialSupplierDto;
import com.cobe.api.model.entity.MaterialSupplier;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {BaseMapper.class, CompanyMapper.class, ContactMapper.class, AddressMapper.class, SharedDetailsMapper.class})
public interface MaterialSupplierMapper {

    @Mapping(source = "company.id", target = "companyId")
    @Mapping(source = "company.companyName", target = "companyName")
    @Mapping(source = "contact.id", target = "contactId")
    @Mapping(source = "address.id", target = "addressId")
    @Mapping(source = "address.city.cityName", target = "cityName")
    @Mapping(source = "address.city.postalCode", target = "postalCode")
    @Mapping(source = "address.city.country.countryCode", target = "countryCode")
    @Mapping(source = "sharedDetails.id", target = "sharedDetailsId")
    MaterialSupplierDto toDto(MaterialSupplier entity);

    @Mapping(source = "companyId", target = "company.id")
    @Mapping(source = "addressId", target = "address", qualifiedByName = "mapAddressIdToAddress")
    @Mapping(source = "contactId", target = "contact", qualifiedByName = "mapContactIdToContact")
    @Mapping(source = "sharedDetailsId", target = "sharedDetails", qualifiedByName = "mapSharedDetailsIdToSharedDetails")
    MaterialSupplier toEntity(PostMaterialSupplierDto dto);

    @Mapping(source = "companyId", target = "company.id")
    @Mapping(source = "addressId", target = "address", qualifiedByName = "mapAddressIdToAddress")
    @Mapping(source = "contactId", target = "contact", qualifiedByName = "mapContactIdToContact")
    @Mapping(source = "sharedDetailsId", target = "sharedDetails", qualifiedByName = "mapSharedDetailsIdToSharedDetails")
    void updateMaterialSupplierFromDto(PostMaterialSupplierDto dto, @MappingTarget MaterialSupplier entity);
}