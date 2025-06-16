package com.beco.api.service.object;

import com.beco.api.mapper.MaterialSupplierMapper;
import com.beco.api.model.dto.MaterialSupplierDto;
import com.beco.api.model.entity.MaterialSupplier;
import com.beco.api.repository.MaterialSupplierRepository;
import com.beco.api.service.AbstractCrudService;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@CacheConfig(cacheNames = "material-suppliers")
public class MaterialSupplierService extends AbstractCrudService<MaterialSupplier, MaterialSupplierDto, MaterialSupplierDto, UUID> {

    private final MaterialSupplierRepository repository;
    private final MaterialSupplierMapper mapper;

    public MaterialSupplierService(
            MaterialSupplierRepository repository,
            CacheManager cacheManager,
            MaterialSupplierMapper mapper
    ) {
        super(
                repository,
                cacheManager,
                mapper::toDto,
                mapper::toEntity,
                mapper::updateMaterialSupplierFromDto
        );
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    @Cacheable(key = "'all'")
    public List<MaterialSupplierDto> findAll() {
        return super.findAll();
    }

    @Override
    @Cacheable(key = "#id")
    public MaterialSupplierDto findById(UUID id) {
        return super.findById(id);
    }

    @Override
    @CachePut(key = "#result.materialSupplierId")
    public MaterialSupplierDto create(MaterialSupplierDto dto) {
        return super.create(dto);
    }

    @Override
    @CachePut(key = "#id")
    public MaterialSupplierDto update(UUID id, MaterialSupplierDto dto) {
        return super.update(id, dto);
    }

    @Override
    @CacheEvict(key = "#id")
    public void deleteById(UUID id) {
        super.deleteById(id);
    }

    @Override
    protected boolean dataValidatorControl(MaterialSupplierDto dto) { return true; }

    @Override
    protected String getEntityName() {
        return "material-supplier";
    }
}
