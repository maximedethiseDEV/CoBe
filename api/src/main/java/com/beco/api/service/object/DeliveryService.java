package com.beco.api.service.object;

import com.beco.api.mapper.DeliveryMapper;
import com.beco.api.model.dto.DeliveryDto;
import com.beco.api.model.entity.Delivery;
import com.beco.api.repository.DeliveryRepository;
import com.beco.api.service.AbstractCrudService;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@CacheConfig(cacheNames = "deliveries")
public class DeliveryService extends AbstractCrudService<Delivery, DeliveryDto, DeliveryDto, Integer> {

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
    public DeliveryDto findById(Integer id) {
        return super.findById(id);
    }

    @Override
    @CachePut(key = "#result.id")
    public DeliveryDto create(DeliveryDto dto) {
        return super.create(dto);
    }

    @Override
    @CachePut(key = "#id")
    public DeliveryDto update(Integer id, DeliveryDto dto) {
        return super.update(id, dto);
    }

    @Override
    @CacheEvict(key = "#id")
    public void deleteById(Integer id) {
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
