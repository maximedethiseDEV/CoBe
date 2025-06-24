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
    @Cacheable(key = "'all'")
    public List<CountryDto> findAll() {
        return super.findAll();
    }

    @Override
    @Cacheable(key = "#id")
    public CountryDto findById(UUID id) {
        return super.findById(id);
    }

    @Override
    @CachePut(key = "#result.countryId")
    @CacheEvict(value = "countries", key = "'all'")
    public CountryDto create(CountryDto dto) {
        return super.create(dto);
    }

    @Override
    @CachePut(key = "#id")
    @CacheEvict(value = "countries", key = "'all'")
    public CountryDto update(UUID id, CountryDto dto) {
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
    protected boolean dataValidatorControl(CountryDto dto) {
        return true;
    }

    @Override
    protected String getEntityName() {
        return "country";
    }
}
