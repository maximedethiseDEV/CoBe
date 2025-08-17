package com.cobe.api.service.object;

import com.cobe.api.mapper.CityMapper;
import com.cobe.api.model.dto.CityDto;
import com.cobe.api.model.dto.PostCityDto;
import com.cobe.api.model.entity.City;
import com.cobe.api.repository.CityRepository;
import com.cobe.api.service.AbstractCrudService;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.*;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@CacheConfig(cacheNames = "cities")
public class CityService extends AbstractCrudService<City, CityDto, PostCityDto, UUID> {

    private final CityRepository repository;
    private final CityMapper mapper;

    public CityService(
            CityRepository repository,
            CacheManager cacheManager,
            CityMapper mapper
    ) {
        super(
                repository,
                cacheManager,
                mapper::toDto,
                mapper::toEntity,
                mapper::updateCityFromDto

        );
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    protected boolean dataValidatorControl(PostCityDto dto) {
        return true;
    }

    @Override
    protected String getEntityName() {
        return "cities";
    }
}

