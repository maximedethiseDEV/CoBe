package com.beco.api.service.object;

import com.beco.api.model.dto.CountryDto;
import com.beco.api.mapper.CountryMapper;
import com.beco.api.model.entity.Country;
import com.beco.api.repository.CountryRepository;
import com.beco.api.service.AbstractCrudService;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.*;
import org.springframework.stereotype.Service;

import java.util.List;
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
