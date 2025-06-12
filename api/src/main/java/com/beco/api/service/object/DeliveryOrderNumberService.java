package com.beco.api.service.object;

import com.beco.api.mapper.DeliveryOrderNumberMapper;
import com.beco.api.model.dto.DeliveryOrderNumberDto;
import com.beco.api.model.entity.DeliveryOrderNumber;
import com.beco.api.repository.DeliveryOrderNumberRepository;
import com.beco.api.service.AbstractCrudService;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@CacheConfig(cacheNames = "unique-delivery-numbers")
public class DeliveryOrderNumberService extends AbstractCrudService<DeliveryOrderNumber, DeliveryOrderNumberDto, DeliveryOrderNumberDto, Integer> {

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
    public DeliveryOrderNumberDto findById(Integer id) {
        return super.findById(id);
    }

    @Override
    @CachePut(key = "#result.id")
    public DeliveryOrderNumberDto create(DeliveryOrderNumberDto dto) {
        return super.create(dto);
    }

    @Override
    @CachePut(key = "#id")
    public DeliveryOrderNumberDto update(Integer id, DeliveryOrderNumberDto dto) {
        return super.update(id, dto);
    }

    @Override
    @CacheEvict(key = "#id")
    public void deleteById(Integer id) {
        super.deleteById(id);
    }

    @Override
    protected boolean dataValidatorControl(DeliveryOrderNumberDto countryDto) {
        return true;
    }

    @Override
    protected String getEntityName() {
        return "country";
    }
}
