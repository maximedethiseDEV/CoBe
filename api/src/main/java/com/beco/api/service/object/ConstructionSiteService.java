package com.beco.api.service.object;

import com.beco.api.mapper.ConstructionSiteMapper;
import com.beco.api.model.dto.ConstructionSiteDto;
import com.beco.api.model.entity.ConstructionSite;
import com.beco.api.repository.ConstructionSiteRepository;
import com.beco.api.service.AbstractCrudService;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@CacheConfig(cacheNames = "construction-sites")
public class ConstructionSiteService extends AbstractCrudService<ConstructionSite, ConstructionSiteDto, ConstructionSiteDto, UUID> {

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
    protected boolean dataValidatorControl(ConstructionSiteDto dto) {
        return true;
    }

    @Override
    protected String getEntityName() {
        return "construction-site";
    }
}
