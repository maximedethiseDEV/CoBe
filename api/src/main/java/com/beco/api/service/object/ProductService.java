package com.beco.api.service.object;

import com.beco.api.mapper.ProductMapper;
import com.beco.api.model.dto.ProductDto;
import com.beco.api.model.entity.Product;
import com.beco.api.repository.ProductRepository;
import com.beco.api.service.AbstractCrudService;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@CacheConfig(cacheNames = "products")
public class ProductService extends AbstractCrudService<Product, ProductDto, ProductDto, UUID> {

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
    @Cacheable(key = "'all'")
    public List<ProductDto> findAll() {
        return super.findAll();
    }

    @Override
    @Cacheable(key = "#id")
    public ProductDto findById(UUID id) {
        return super.findById(id);
    }

    @Override
    @CachePut(key = "#result.productId")
    @CacheEvict(value = "products", key = "'all'")
    public ProductDto create(ProductDto dto) {
        return super.create(dto);
    }

    @Override
    @CachePut(key = "#id")
    @CacheEvict(value = "products", key = "'all'")
    public ProductDto update(UUID id, ProductDto dto) {
        return super.update(id, dto);
    }

    @Override
    @Caching(evict = {
            @CacheEvict(key = "#id"),
            @CacheEvict(key = "'all'")
    })
    public void deleteById(UUID id) {
        super.deleteById(id);
    }

    @Override
    protected boolean dataValidatorControl(ProductDto dto) {
        return true;
    }

    @Override
    protected String getEntityName() {
        return "product";
    }
}
