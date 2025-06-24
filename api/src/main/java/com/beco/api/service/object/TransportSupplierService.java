package com.beco.api.service.object;

import com.beco.api.mapper.TransportSupplierMapper;
import com.beco.api.model.dto.TransportSupplierDto;
import com.beco.api.model.entity.TransportSupplier;
import com.beco.api.repository.TransportSupplierRepository;
import com.beco.api.service.AbstractCrudService;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@CacheConfig(cacheNames = "transport-suppliers")
public class TransportSupplierService extends AbstractCrudService<TransportSupplier, TransportSupplierDto, TransportSupplierDto, UUID> {

    private final TransportSupplierRepository repository;
    private final TransportSupplierMapper mapper;

    public TransportSupplierService(
            TransportSupplierRepository repository,
            CacheManager cacheManager,
            TransportSupplierMapper mapper
    ) {
        super(
                repository,
                cacheManager,
                mapper::toDto,
                mapper::toEntity,
                mapper::updateTransportSupplierFromDto
        );
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    @Cacheable(key = "'all'")
    public List<TransportSupplierDto> findAll() {
        return super.findAll();
    }

    @Override
    @Cacheable(key = "#id")
    public TransportSupplierDto findById(UUID id) {
        return super.findById(id);
    }

    @Override
    @CachePut(key = "#result.transportSupplierId")
    @CacheEvict(value = "transport-suppliers", key = "'all'")
    public TransportSupplierDto create(TransportSupplierDto dto) {
        return super.create(dto);
    }

    @Override
    @CachePut(key = "#id")
    @CacheEvict(value = "transport-suppliers", key = "'all'")
    public TransportSupplierDto update(UUID id, TransportSupplierDto dto) {
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
    protected boolean dataValidatorControl(TransportSupplierDto dto) { return true; }

    @Override
    protected String getEntityName() {
        return "transport-supplier";
    }
}
