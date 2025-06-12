package com.beco.api.mapper;

import com.beco.api.model.dto.OrderDto;
import com.beco.api.model.entity.Order;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {CustomerMapper.class, ProductMapper.class, AddressMapper.class})
public interface OrderMapper {

    @Mapping(target = "orderId", source = "orderId")
    @Mapping(target = "billingCustomer", source = "billingCustomer")
    @Mapping(target = "deliveryCustomer", source = "deliveryCustomer")
    @Mapping(target = "constructionSiteId", source = "constructionSiteId")
    @Mapping(target = "quantityOrdered", source = "quantityOrdered")
    @Mapping(target = "requestedDeliveryDate", source = "requestedDeliveryDate")
    @Mapping(target = "requestedDeliveryTime", source = "requestedDeliveryTime")
    @Mapping(target = "product", source = "product")
    @Mapping(target = "sharedDetails", source = "sharedDetails")
    OrderDto toDto(Order entity);

    @Mapping(target = "orderId", ignore = true)
    @Mapping(target = "billingCustomer", source = "billingCustomer")
    @Mapping(target = "deliveryCustomer", source = "deliveryCustomer")
    @Mapping(target = "constructionSiteId", source = "constructionSiteId")
    @Mapping(target = "quantityOrdered", source = "quantityOrdered")
    @Mapping(target = "requestedDeliveryDate", source = "requestedDeliveryDate")
    @Mapping(target = "requestedDeliveryTime", source = "requestedDeliveryTime")
    @Mapping(target = "product", source = "product")
    @Mapping(target = "sharedDetails", source = "sharedDetails")
    Order toEntity(OrderDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "orderId", ignore = true)
    void updateOrderFromDto(OrderDto dto, @MappingTarget Order entity);
}