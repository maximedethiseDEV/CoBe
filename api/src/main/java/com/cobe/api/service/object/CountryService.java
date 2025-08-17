package com.cobe.api.service.object;

import com.cobe.api.model.dto.CountryDto;
import com.cobe.api.mapper.CountryMapper;
import com.cobe.api.model.entity.Country;
import com.cobe.api.repository.CountryRepository;
import com.cobe.api.service.AbstractCrudService;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.*;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@CacheConfig(cacheNames = "countries")
public class CountryService extends AbstractCrudService<Country, CountryDto, CountryDto, UUID> {

    private final CountryRepository repository;
    private final CountryMapper mapper;

    public CountryService(
            CountryRepository repository,
            CacheManager cacheManager,
            CountryMapper mapper
    ) {
        super(
                repository,
                cacheManager,
                mapper::toDto,
                mapper::toEntity,
                mapper::updateCountryFromDto

        );
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    protected boolean dataValidatorControl(CountryDto dto) {
        return true;
    }

    @Override
    protected String getEntityName() {
        return "country";
    }
}
