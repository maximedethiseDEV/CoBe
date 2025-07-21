package com.beco.api.service.object;

import com.beco.api.mapper.DeliveryOrderNumberMapper;
import com.beco.api.model.dto.DeliveryOrderNumberDto;
import com.beco.api.model.entity.DeliveryOrderNumber;
import com.beco.api.repository.DeliveryOrderNumberRepository;
import com.beco.api.service.AbstractCrudService;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@CacheConfig(cacheNames = "unique-delivery-numbers")
public class DeliveryOrderNumberService extends AbstractCrudService<DeliveryOrderNumber, DeliveryOrderNumberDto, DeliveryOrderNumberDto, UUID> {

    private final DeliveryOrderNumberRepository repository;
    private final DeliveryOrderNumberMapper mapper;

    public DeliveryOrderNumberService(
            DeliveryOrderNumberRepository repository,
            CacheManager cacheManager,
            DeliveryOrderNumberMapper mapper
    ) {
        super(
                repository,
                cacheManager,
                mapper::toDto,
                mapper::toEntity,
                mapper::updateDeliveryOrderNumberFromDto

        );
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    protected boolean dataValidatorControl(DeliveryOrderNumberDto dto) {
        return true;
    }

    @Override
    protected String getEntityName() {
        return "unique-delivery-number";
    }
}
