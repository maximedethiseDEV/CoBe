package com.beco.api.service.object;

import com.beco.api.mapper.DeliveryMapper;
import com.beco.api.model.dto.DeliveryDto;
import com.beco.api.model.entity.Delivery;
import com.beco.api.repository.DeliveryRepository;
import com.beco.api.service.AbstractCrudService;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@CacheConfig(cacheNames = "deliveries")
public class DeliveryService extends AbstractCrudService<Delivery, DeliveryDto, DeliveryDto, UUID> {

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
    @Cacheable(key = "'all'")
    public List<DeliveryDto> findAll() {
        return super.findAll();
    }

    @Override
    @Cacheable(key = "#id")
    public DeliveryDto findById(UUID id) {
        return super.findById(id);
    }

    @Override
    @CachePut(key = "#result.deliveryId")
    @CacheEvict(value = "deliveries", key = "'all'")
    public DeliveryDto create(DeliveryDto dto) {
        return super.create(dto);
    }

    @Override
    @CachePut(key = "#id")
    @CacheEvict(value = "deliveries", key = "'all'")
    public DeliveryDto update(UUID id, DeliveryDto dto) {
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
    protected boolean dataValidatorControl(DeliveryDto dto) {
        return true;
    }

    @Override
    protected String getEntityName() {
        return "delivery";
    }
}
