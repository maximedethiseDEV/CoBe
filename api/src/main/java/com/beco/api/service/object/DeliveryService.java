package com.beco.api.service.object;

import com.beco.api.mapper.DeliveryMapper;
import com.beco.api.model.dto.DeliveryDto;
import com.beco.api.model.dto.PostDeliveryDto;
import com.beco.api.model.entity.Delivery;
import com.beco.api.repository.DeliveryRepository;
import com.beco.api.service.AbstractCrudService;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.*;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@CacheConfig(cacheNames = "deliveries")
public class DeliveryService extends AbstractCrudService<Delivery, DeliveryDto, PostDeliveryDto, UUID> {

    private final DeliveryRepository repository;
    private final DeliveryMapper mapper;

    public DeliveryService(
            DeliveryRepository repository,
            CacheManager cacheManager,
            DeliveryMapper mapper
    ) {
        super(
                repository,
                cacheManager,
                mapper::toDto,
                mapper::toEntity,
                mapper::updateDeliveryFromDto

        );
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    protected boolean dataValidatorControl(PostDeliveryDto dto) {
        return true;
    }

    @Override
    protected String getEntityName() {
        return "delivery";
    }
}
