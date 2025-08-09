package com.beco.api.mapper;

import com.beco.api.model.dto.OrderDto;
import com.beco.api.model.dto.PostOrderDto;
import com.beco.api.model.entity.Order;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {CustomerMapper.class, ProductMapper.class, AddressMapper.class})
public interface OrderMapper {

    @Mapping(source = "billingCustomer.id", target = "billingCustomerId")
    @Mapping(source = "deliveryCustomer.id", target = "deliveryCustomerId")
    @Mapping(source = "constructionSite.id", target = "constructionSiteId")
    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "sharedDetails.id", target = "sharedDetailsId")
    OrderDto toDto(Order entity);

    @Mapping(source = "billingCustomerId", target = "billingCustomer.id")
    @Mapping(source = "deliveryCustomerId", target = "deliveryCustomer.id")
    @Mapping(source = "constructionSiteId", target = "constructionSite.id")
    @Mapping(source = "productId", target = "product.id")
    @Mapping(source = "sharedDetailsId", target = "sharedDetails.id")
    Order toEntity(PostOrderDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateOrderFromDto(PostOrderDto dto, @MappingTarget Order entity);
}