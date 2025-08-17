package com.cobe.api.service.object;

import com.cobe.api.mapper.CustomerMapper;
import com.cobe.api.model.dto.CustomerDto;
import com.cobe.api.model.dto.PostCustomerDto;
import com.cobe.api.model.entity.Customer;
import com.cobe.api.repository.CustomerRepository;
import com.cobe.api.service.AbstractCrudService;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.*;
import org.springframework.stereotype.Service;

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
