package com.beco.api.service.object;

import com.beco.api.mapper.CityMapper;
import com.beco.api.model.dto.CityDto;
import com.beco.api.model.entity.City;
import com.beco.api.repository.CityRepository;
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
public class CityService extends AbstractCrudService<City, CityDto, CityDto, Integer> {

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
    @Cacheable(key = "'all'")
    public List<CityDto> findAll() {
        return super.findAll();
    }

    @Override
    @Cacheable(key = "#id")
    public CityDto findById(Integer id) {
        return super.findById(id);
    }

    @Override
    @CachePut(key = "#result.id")
    public CityDto create(CityDto dto) {
        return super.create(dto);
    }

    @Override
    @CachePut(key = "#id")
    public CityDto update(Integer id, CityDto dto) {
        return super.update(id, dto);
    }

    @Override
    @CacheEvict(key = "#id")
    public void deleteById(Integer id) {
        super.deleteById(id);
    }

    @Override
    protected boolean dataValidatorControl(CityDto countryDto) {
        return true;
    }

    @Override
    protected String getEntityName() {
        return "country";
    }
}
