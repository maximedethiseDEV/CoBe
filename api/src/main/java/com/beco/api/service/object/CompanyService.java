package com.beco.api.service.object;

import com.beco.api.mapper.CompanyMapper;
import com.beco.api.model.dto.CompanyDto;
import com.beco.api.model.entity.Company;
import com.beco.api.repository.CompanyRepository;
import com.beco.api.service.AbstractCrudService;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@CacheConfig(cacheNames = "companies")
public class CompanyService extends AbstractCrudService<Company, CompanyDto, CompanyDto, UUID> {

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
    protected boolean dataValidatorControl(CompanyDto dto) { return true; }

    @Override
    protected String getEntityName() {
        return "company";
    }
}
