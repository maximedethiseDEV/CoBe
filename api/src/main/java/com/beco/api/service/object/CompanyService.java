package com.beco.api.service.object;

import com.beco.api.mapper.CompanyMapper;
import com.beco.api.model.dto.CompanyDto;
import com.beco.api.model.entity.Company;
import com.beco.api.repository.CompanyRepository;
import com.beco.api.service.AbstractCrudService;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@CacheConfig(cacheNames = "companies")
public class CompanyService extends AbstractCrudService<Company, CompanyDto, CompanyDto, Integer> {

    private final CompanyRepository repository;
    private final CompanyMapper mapper;

    public CompanyService(
            CompanyRepository repository,
            CacheManager cacheManager,
            CompanyMapper mapper
    ) {
        super(
                repository,
                cacheManager,
                mapper::toDto,
                mapper::toEntity,
                mapper::updateCompanyFromDto
        );
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    @Cacheable(key = "'all'")
    public List<CompanyDto> findAll() {
        return super.findAll();
    }

    @Override
    @Cacheable(key = "#id")
    public CompanyDto findById(Integer id) {
        return super.findById(id);
    }

    @Override
    @CachePut(key = "#result.id")
    public CompanyDto create(CompanyDto dto) {
        return super.create(dto);
    }

    @Override
    @CachePut(key = "#id")
    public CompanyDto update(Integer id, CompanyDto dto) {
        return super.update(id, dto);
    }

    @Override
    @CacheEvict(key = "#id")
    public void deleteById(Integer id) {
        super.deleteById(id);
    }

    @Override
    protected boolean dataValidatorControl(CompanyDto postCompanyDto) { return true; }

    @Override
    protected String getEntityName() {
        return "address";
    }
}
