package com.beco.api.mapper;

import com.beco.api.model.dto.ProductDto;
import com.beco.api.model.entity.Product;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {MaterialSupplierMapper.class})
public interface ProductMapper {

    @Mapping(target = "productId", source = "productId")
    @Mapping(target = "productCode", source = "productCode")
    @Mapping(target = "materialSupplier", source = "materialSupplier")
    @Mapping(target = "sharedDetails", source = "sharedDetails")
    @Mapping(target = "createdDate", source = "createdDate")
    @Mapping(target = "lastModifiedDate", source = "lastModifiedDate")
    ProductDto toDto(Product entity);

    @Mapping(target = "productId", ignore = true)
    @Mapping(target = "productCode", source = "productCode")
    @Mapping(target = "materialSupplier", source = "materialSupplier")
    @Mapping(target = "sharedDetails", source = "sharedDetails")
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    Product toEntity(ProductDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "productId", ignore = true)
    void updateProductFromDto(ProductDto dto, @MappingTarget Product entity);
}