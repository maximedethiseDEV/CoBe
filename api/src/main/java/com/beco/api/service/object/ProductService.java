package com.beco.api.service.object;

import com.beco.api.mapper.ProductMapper;
import com.beco.api.model.dto.ProductDto;
import com.beco.api.model.entity.Product;
import com.beco.api.repository.ProductRepository;
import com.beco.api.service.AbstractCrudService;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@CacheConfig(cacheNames = "products")
public class ProductService extends AbstractCrudService<Product, ProductDto, ProductDto, Integer> {

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
    public ProductDto findById(Integer id) {
        return super.findById(id);
    }

    @Override
    @CachePut(key = "#result.id")
    public ProductDto create(ProductDto dto) {
        return super.create(dto);
    }

    @Override
    @CachePut(key = "#id")
    public ProductDto update(Integer id, ProductDto dto) {
        return super.update(id, dto);
    }

    @Override
    @CacheEvict(key = "#id")
    public void deleteById(Integer id) {
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
