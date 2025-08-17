package com.cobe.api.service.object;

import com.cobe.api.mapper.TransportSupplierMapper;
import com.cobe.api.model.dto.PostTransportSupplierDto;
import com.cobe.api.model.dto.TransportSupplierDto;
import com.cobe.api.model.entity.TransportSupplier;
import com.cobe.api.repository.TransportSupplierRepository;
import com.cobe.api.service.AbstractCrudService;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.*;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@CacheConfig(cacheNames = "transport-suppliers")
public class TransportSupplierService extends AbstractCrudService<TransportSupplier, TransportSupplierDto, PostTransportSupplierDto, UUID> {

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
    protected boolean dataValidatorControl(PostTransportSupplierDto dto) { return true; }

    @Override
    protected String getEntityName() {
        return "transport-supplier";
    }
}
