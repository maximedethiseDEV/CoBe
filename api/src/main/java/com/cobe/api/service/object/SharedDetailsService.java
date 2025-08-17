package com.cobe.api.service.object;

import com.cobe.api.mapper.SharedDetailsMapper;
import com.cobe.api.model.dto.SharedDetailsDto;
import com.cobe.api.model.entity.SharedDetails;
import com.cobe.api.repository.SharedDetailsRepository;
import com.cobe.api.service.AbstractCrudService;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.*;
import org.springframework.stereotype.Service;

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
    protected boolean dataValidatorControl(SharedDetailsDto dto) {
        return true;
    }

    @Override
    protected String getEntityName() {
        return "shared-detail";
    }
}
