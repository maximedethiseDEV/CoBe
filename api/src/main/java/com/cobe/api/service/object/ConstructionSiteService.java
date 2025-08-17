package com.cobe.api.service.object;

import com.cobe.api.mapper.ConstructionSiteMapper;
import com.cobe.api.model.dto.ConstructionSiteDto;
import com.cobe.api.model.dto.PostConstructionSiteDto;
import com.cobe.api.model.entity.ConstructionSite;
import com.cobe.api.repository.ConstructionSiteRepository;
import com.cobe.api.service.AbstractCrudService;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.*;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@CacheConfig(cacheNames = "construction-sites")
public class ConstructionSiteService extends AbstractCrudService<ConstructionSite, ConstructionSiteDto, PostConstructionSiteDto, UUID> {

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
    protected boolean dataValidatorControl(PostConstructionSiteDto dto) {
        return true;
    }

    @Override
    protected String getEntityName() {
        return "construction-site";
    }
}
