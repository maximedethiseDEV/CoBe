package com.beco.api.service.object;

import com.beco.api.mapper.CustomerMapper;
import com.beco.api.model.dto.CustomerDto;
import com.beco.api.model.dto.PostCustomerDto;
import com.beco.api.model.entity.Customer;
import com.beco.api.repository.CustomerRepository;
import com.beco.api.service.AbstractCrudService;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@CacheConfig(cacheNames = "customers")
public class CustomerService extends AbstractCrudService<Customer, CustomerDto, PostCustomerDto, UUID> {

    private final CustomerRepository repository;
    private final CustomerMapper mapper;

    public CustomerService(
            CustomerRepository repository,
            CacheManager cacheManager,
            CustomerMapper mapper
    ) {
        super(
                repository,
                cacheManager,
                mapper::toDto,
                mapper::toEntity,
                mapper::updateCustomerFromDto

        );
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    protected boolean dataValidatorControl(PostCustomerDto dto) {
        return true;
    }

    @Override
    protected String getEntityName() {
        return "country";
    }
}
