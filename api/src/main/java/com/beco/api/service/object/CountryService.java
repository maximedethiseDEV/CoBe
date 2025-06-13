package com.beco.api.service.object;

import com.beco.api.model.dto.CountryDto;
import com.beco.api.mapper.CountryMapper;
import com.beco.api.model.entity.Country;
import com.beco.api.repository.CountryRepository;
import com.beco.api.service.AbstractCrudService;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@CacheConfig(cacheNames = "countries")
public class CountryService extends AbstractCrudService<Country, CountryDto, CountryDto, Integer> {

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
    public CountryDto findById(Integer id) {
        return super.findById(id);
    }

    @Override
    @CachePut(key = "#result.id")
    public CountryDto create(CountryDto dto) {
        return super.create(dto);
    }

    @Override
    @CachePut(key = "#id")
    public CountryDto update(Integer id, CountryDto dto) {
        return super.update(id, dto);
    }

    @Override
    @CacheEvict(key = "#id")
    public void deleteById(Integer id) {
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
