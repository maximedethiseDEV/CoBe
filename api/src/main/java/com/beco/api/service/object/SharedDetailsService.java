package com.beco.api.service.object;

import com.beco.api.mapper.SharedDetailsMapper;
import com.beco.api.model.dto.SharedDetailsDto;
import com.beco.api.model.entity.SharedDetails;
import com.beco.api.repository.SharedDetailsRepository;
import com.beco.api.service.AbstractCrudService;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@CacheConfig(cacheNames = "cities")
public class SharedDetailsService extends AbstractCrudService<SharedDetails, SharedDetailsDto, SharedDetailsDto, Integer> {

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
    public SharedDetailsDto findById(Integer id) {
        return super.findById(id);
    }

    @Override
    @CachePut(key = "#result.id")
    public SharedDetailsDto create(SharedDetailsDto dto) {
        return super.create(dto);
    }

    @Override
    @CachePut(key = "#id")
    public SharedDetailsDto update(Integer id, SharedDetailsDto dto) {
        return super.update(id, dto);
    }

    @Override
    @CacheEvict(key = "#id")
    public void deleteById(Integer id) {
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
