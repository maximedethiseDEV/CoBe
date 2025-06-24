package com.beco.api.service.object;

import com.beco.api.mapper.SharedDetailsMapper;
import com.beco.api.model.dto.SharedDetailsDto;
import com.beco.api.model.entity.SharedDetails;
import com.beco.api.repository.SharedDetailsRepository;
import com.beco.api.service.AbstractCrudService;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@CacheConfig(cacheNames = "shared-details")
public class SharedDetailsService extends AbstractCrudService<SharedDetails, SharedDetailsDto, SharedDetailsDto, UUID> {

    private final SharedDetailsRepository repository;
    private final SharedDetailsMapper mapper;

    public SharedDetailsService(
            SharedDetailsRepository repository,
            CacheManager cacheManager,
            SharedDetailsMapper mapper
    ) {
        super(
                repository,
                cacheManager,
                mapper::toDto,
                mapper::toEntity,
                mapper::updateSharedDetailsFromDto

        );
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    @Cacheable(key = "'all'")
    public List<SharedDetailsDto> findAll() {
        return super.findAll();
    }

    @Override
    @Cacheable(key = "#id")
    public SharedDetailsDto findById(UUID id) {
        return super.findById(id);
    }

    @Override
    @CachePut(key = "#result.sharedDetailsId")
    @CacheEvict(value = "shared-details", key = "'all'")
    public SharedDetailsDto create(SharedDetailsDto dto) {
        return super.create(dto);
    }

    @Override
    @CachePut(key = "#id")
    @CacheEvict(value = "shared-details", key = "'all'")
    public SharedDetailsDto update(UUID id, SharedDetailsDto dto) {
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
    protected boolean dataValidatorControl(SharedDetailsDto dto) {
        return true;
    }

    @Override
    protected String getEntityName() {
        return "shared-detail";
    }
}
