package com.cobe.api.mapper;

import com.cobe.api.model.dto.PostProductDto;
import com.cobe.api.model.dto.ProductDto;
import com.cobe.api.model.entity.Product;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {BaseMapper.class, MaterialSupplierMapper.class})
public interface ProductMapper {

    @Mapping(source = "materialSupplier.id", target = "materialSupplierId")
    @Mapping(source = "materialSupplier.company.companyName", target = "companyName")
    @Mapping(source = "sharedDetails.id", target = "sharedDetailsId")
    ProductDto toDto(Product entity);

    @Mapping(source = "materialSupplierId", target = "materialSupplier.id")
    @Mapping(source = "sharedDetailsId", target = "sharedDetails", qualifiedByName = "mapSharedDetailsIdToSharedDetails")
    Product toEntity(PostProductDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateProductFromDto(PostProductDto dto, @MappingTarget Product entity);
}