package com.beco.api.mapper;

import com.beco.api.model.dto.OrderDto;
import com.beco.api.model.dto.PostOrderDto;
import com.beco.api.model.entity.Order;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {BaseMapper.class, ConstructionSiteMapper.class, CustomerMapper.class, ProductMapper.class, AddressMapper.class, SharedDetailsMapper.class})
public interface OrderMapper {

    @Mapping(source = "billingCustomer.id", target = "billingCustomerId")
    @Mapping(source = "billingCustomer.company.companyName", target = "billingCustomerName")
    @Mapping(source = "deliveryCustomer.id", target = "deliveryCustomerId")
    @Mapping(source = "deliveryCustomer.company.companyName", target = "deliveryCustomerName")
    @Mapping(source = "constructionSite.id", target = "constructionSiteId")
    @Mapping(source = "constructionSite.customer.company.companyName", target = "constructionSiteCustomerName")
    @Mapping(source = "constructionSite.address.street", target = "constructionSiteStreet")
    @Mapping(source = "constructionSite.address.city.cityName", target = "constructionSiteCityName")
    @Mapping(source = "constructionSite.address.city.postalCode", target = "constructionSitePostalCode")
    @Mapping(source = "constructionSite.address.city.country.countryCode", target = "constructionSiteCountryCode")
    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "product.code", target = "code")
    @Mapping(source = "product.name", target = "name")
    @Mapping(source = "product.materialSupplier.company.companyName", target = "materialSupplierName")
    @Mapping(source = "sharedDetails.id", target = "sharedDetailsId")
    OrderDto toDto(Order entity);

    @Mapping(source = "billingCustomerId", target = "billingCustomer.id")
    @Mapping(source = "deliveryCustomerId", target = "deliveryCustomer", qualifiedByName = "mapCustomerIdToCustomer")
    @Mapping(source = "constructionSiteId", target = "constructionSite", qualifiedByName = "mapConstructionSiteIdToConstructionSite")
    @Mapping(source = "productId", target = "product.id")
    @Mapping(source = "sharedDetailsId", target = "sharedDetails", qualifiedByName = "mapSharedDetailsIdToSharedDetails")
    Order toEntity(PostOrderDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateOrderFromDto(PostOrderDto dto, @MappingTarget Order entity);
}