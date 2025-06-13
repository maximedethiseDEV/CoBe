package com.beco.api.service.object;

import com.beco.api.mapper.ConstructionSiteMapper;
import com.beco.api.model.dto.ConstructionSiteDto;
import com.beco.api.model.entity.ConstructionSite;
import com.beco.api.repository.ConstructionSiteRepository;
import com.beco.api.service.AbstractCrudService;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@CacheConfig(cacheNames = "construction-sites")
public class ConstructionSiteService extends AbstractCrudService<ConstructionSite, ConstructionSiteDto, ConstructionSiteDto, Integer> {

    private final ConstructionSiteRepository repository;
    private final ConstructionSiteMapper mapper;

    public ConstructionSiteService(
            ConstructionSiteRepository repository,
            CacheManager cacheManager,
            ConstructionSiteMapper mapper
    ) {
        super(
                repository,
                cacheManager,
                mapper::toDto,
                mapper::toEntity,
                mapper::updateConstructionSiteFromDto

        );
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    @Cacheable(key = "'all'")
    public List<ConstructionSiteDto> findAll() {
        return super.findAll();
    }

    @Override
    @Cacheable(key = "#id")
    public ConstructionSiteDto findById(Integer id) {
        return super.findById(id);
    }

    @Override
    @CachePut(key = "#result.id")
    public ConstructionSiteDto create(ConstructionSiteDto dto) {
        return super.create(dto);
    }

    @Override
    @CachePut(key = "#id")
    public ConstructionSiteDto update(Integer id, ConstructionSiteDto dto) {
        return super.update(id, dto);
    }

    @Override
    @CacheEvict(key = "#id")
    public void deleteById(Integer id) {
        super.deleteById(id);
    }

    @Override
    protected boolean dataValidatorControl(ConstructionSiteDto dto) {
        return true;
    }

    @Override
    protected String getEntityName() {
        return "construction-site";
    }
}
