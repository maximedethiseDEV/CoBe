package com.beco.api.service.object;

import com.beco.api.model.dto.CustomerDto;
import com.beco.api.mapper.CustomerMapper;
import com.beco.api.model.entity.Customer;
import com.beco.api.repository.CustomerRepository;
import com.beco.api.service.AbstractCrudService;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@CacheConfig(cacheNames = "customers")
public class CustomerService extends AbstractCrudService<Customer, CustomerDto, CustomerDto, Integer> {

    private final CustomerRepository repository;
    private final CustomerMapper mapper;

    public CustomerService(
            CustomerRepository repository,
            CustomerMapper mapper,
            CacheManager cacheManager
    ) {
        super(
                repository,
                cacheManager,
                mapper::toDto,
                mapper::toEntity,
                mapper::updateCustomerFromDto);
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    @Cacheable(key = "'all'")
    public List<CustomerDto> findAll() {
        return super.findAll();
    }

    @Override
    @Cacheable(key = "#id")
    public CustomerDto findById(Integer id) {
        return super.findById(id);
    }

    @Override
    @CachePut(key = "#result.id")
    public CustomerDto create(CustomerDto dto) {
        return super.create(dto);
    }

    @Override
    @CachePut(key = "#id")
    public CustomerDto update(Integer id, CustomerDto dto) {
        return super.update(id, dto);
    }

    @Override
    @CacheEvict(key = "#id")
    public void deleteById(Integer id) {
        super.deleteById(id);
    }

    @Override
    protected boolean dataValidatorControl(CustomerDto customerDto) {
        return true;
    }

    @Override
    protected String getEntityName() {
        return "customer";
    }
}
