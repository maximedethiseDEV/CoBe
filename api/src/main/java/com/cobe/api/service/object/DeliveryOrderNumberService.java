package com.cobe.api.service.object;

import com.cobe.api.mapper.DeliveryOrderNumberMapper;
import com.cobe.api.model.dto.DeliveryOrderNumberDto;
import com.cobe.api.model.dto.PostDeliveryOrderNumberDto;
import com.cobe.api.model.entity.DeliveryOrderNumber;
import com.cobe.api.repository.DeliveryOrderNumberRepository;
import com.cobe.api.service.AbstractCrudService;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.*;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@CacheConfig(cacheNames = "unique-delivery-numbers")
public class DeliveryOrderNumberService extends AbstractCrudService<DeliveryOrderNumber, DeliveryOrderNumberDto, PostDeliveryOrderNumberDto, UUID> {

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
    protected boolean dataValidatorControl(PostDeliveryOrderNumberDto dto) {
        return true;
    }

    @Override
    protected String getEntityName() {
        return "unique-delivery-number";
    }
}
