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
    protected boolean dataValidatorControl(TransportSupplierDto dto) { return true; }

    @Override
    protected String getEntityName() {
        return "transport-supplier";
    }
}
