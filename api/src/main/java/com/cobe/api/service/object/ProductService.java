package com.cobe.api.service.object;

import com.cobe.api.mapper.ProductMapper;
import com.cobe.api.model.dto.PostProductDto;
import com.cobe.api.model.dto.ProductDto;
import com.cobe.api.model.entity.Product;
import com.cobe.api.repository.ProductRepository;
import com.cobe.api.service.AbstractCrudService;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.*;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@CacheConfig(cacheNames = "products")
public class ProductService extends AbstractCrudService<Product, ProductDto, PostProductDto, UUID> {

    private final ProductRepository repository;
    private final ProductMapper mapper;

    public ProductService(
            ProductRepository repository,
            CacheManager cacheManager,
            ProductMapper mapper
    ) {
        super(
                repository,
                cacheManager,
                mapper::toDto,
                mapper::toEntity,
                mapper::updateProductFromDto

        );
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    protected boolean dataValidatorControl(PostProductDto dto) {
        return true;
    }

    @Override
    protected String getEntityName() {
        return "product";
    }
}
