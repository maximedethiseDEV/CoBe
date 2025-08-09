package com.beco.api.service.object;

import com.beco.api.model.dto.AddressDto;
import com.beco.api.model.dto.PostAddressDto;
import com.beco.api.mapper.AddressMapper;
import com.beco.api.model.entity.Address;
import com.beco.api.repository.AddressRepository;
import com.beco.api.service.AbstractCrudService;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.*;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@CacheConfig(cacheNames = "addresses")
public class AddressService extends AbstractCrudService<Address, AddressDto, PostAddressDto, UUID> {

    private final AddressRepository repository;
    private final AddressMapper mapper;

    public AddressService(
            AddressRepository repository,
            CacheManager cacheManager,
            AddressMapper mapper
    ) {
        super(
                repository,
                cacheManager,
                mapper::toDto,
                mapper::toEntity,
                mapper::updateAddressFromDto
        );
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    protected boolean dataValidatorControl(PostAddressDto dto) { return true; }

    @Override
    protected String getEntityName() {
        return "address";
    }
}
