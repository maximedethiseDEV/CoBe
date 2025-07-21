package com.beco.api.mapper;

import com.beco.api.model.dto.ProductDto;
import com.beco.api.model.entity.Product;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {MaterialSupplierMapper.class})
public interface ProductMapper {

    @Mapping(source = "materialSupplier.id", target = "materialSupplierId")
    @Mapping(source = "sharedDetails.id", target = "sharedDetailsId")
    ProductDto toDto(Product entity);

    @Mapping(source = "materialSupplierId", target = "materialSupplier.id")
    @Mapping(source = "sharedDetailsId", target = "sharedDetails.id")
    Product toEntity(ProductDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateProductFromDto(ProductDto dto, @MappingTarget Product entity);
}