package com.cobe.api.service.object;

import com.cobe.api.mapper.MaterialSupplierMapper;
import com.cobe.api.model.dto.MaterialSupplierDto;
import com.cobe.api.model.dto.PostMaterialSupplierDto;
import com.cobe.api.model.entity.MaterialSupplier;
import com.cobe.api.repository.MaterialSupplierRepository;
import com.cobe.api.service.AbstractCrudService;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.*;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@CacheConfig(cacheNames = "material-suppliers")
public class MaterialSupplierService extends AbstractCrudService<MaterialSupplier, MaterialSupplierDto, PostMaterialSupplierDto, UUID> {

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
    protected boolean dataValidatorControl(PostMaterialSupplierDto dto) { return true; }

    @Override
    protected String getEntityName() {
        return "material-supplier";
    }
}
