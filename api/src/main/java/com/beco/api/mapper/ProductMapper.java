package com.beco.api.mapper;

import com.beco.api.model.dto.ProductDto;
import com.beco.api.model.entity.Product;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {MaterialSupplierMapper.class})
public interface ProductMapper {

    ProductDto toDto(Product entity);

    Product toEntity(ProductDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateProductFromDto(ProductDto dto, @MappingTarget Product entity);
}