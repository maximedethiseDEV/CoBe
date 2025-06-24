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
    @Cacheable(key = "'all'")
    public List<DeliveryOrderNumberDto> findAll() {
        return super.findAll();
    }

    @Override
    @Cacheable(key = "#id")
    public DeliveryOrderNumberDto findById(UUID id) {
        return super.findById(id);
    }

    @Override
    @CachePut(key = "#result.deliveryOrderNumberId")
    @CacheEvict(value = "unique-delivery-numbers", key = "'all'")
    public DeliveryOrderNumberDto create(DeliveryOrderNumberDto dto) {
        return super.create(dto);
    }

    @Override
    @CachePut(key = "#id")
    @CacheEvict(value = "unique-delivery-numbers", key = "'all'")
    public DeliveryOrderNumberDto update(UUID id, DeliveryOrderNumberDto dto) {
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
    protected boolean dataValidatorControl(DeliveryOrderNumberDto dto) {
        return true;
    }

    @Override
    protected String getEntityName() {
        return "unique-delivery-number";
    }
}
