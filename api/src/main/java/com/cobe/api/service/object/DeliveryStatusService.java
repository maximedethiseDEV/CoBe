package com.cobe.api.service.object;

import com.cobe.api.mapper.DeliveryStatusMapper;
import com.cobe.api.model.dto.DeliveryStatusDto;
import com.cobe.api.model.entity.DeliveryStatus;
import com.cobe.api.repository.DeliveryStatusRepository;
import com.cobe.api.service.AbstractCrudService;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@CacheConfig(cacheNames = "delivery-status")
public class DeliveryStatusService extends AbstractCrudService<DeliveryStatus, DeliveryStatusDto, DeliveryStatusDto, UUID> {

    private final DeliveryStatusRepository repository;
    private final DeliveryStatusMapper mapper;

    public DeliveryStatusService(
            DeliveryStatusRepository repository,
            CacheManager cacheManager,
            DeliveryStatusMapper mapper
    ) {
        super(
                repository,
                cacheManager,
                mapper::toDto,
                mapper::toEntity,
                mapper::updateDeliveryStatusFromDto

        );
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    protected boolean dataValidatorControl(DeliveryStatusDto dto) {
        return true;
    }

    @Override
    protected String getEntityName() {
        return "status";
    }
}