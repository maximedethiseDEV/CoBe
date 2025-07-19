package com.beco.api.mapper;

import com.beco.api.model.dto.OrderDto;
import com.beco.api.model.entity.Order;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {CustomerMapper.class, ProductMapper.class, AddressMapper.class})
public interface OrderMapper {

    OrderDto toDto(Order entity);

    Order toEntity(OrderDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateOrderFromDto(OrderDto dto, @MappingTarget Order entity);
}