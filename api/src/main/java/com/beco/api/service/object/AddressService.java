package com.beco.api.service.object;

import com.beco.api.model.dto.PostAddressDto;
import com.beco.api.mapper.AddressMapper;
import com.beco.api.model.dto.GetAddressDto;
import com.beco.api.model.entity.Address;
import com.beco.api.repository.AddressRepository;
import com.beco.api.service.AbstractCrudService;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@CacheConfig(cacheNames = "addresses")
public class AddressService extends AbstractCrudService<Address, GetAddressDto, PostAddressDto, UUID> {

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
    @Cacheable(key = "'all'")
    public List<GetAddressDto> findAll() {
        return super.findAll();
    }

    @Override
    @Cacheable(key = "#id")
    public GetAddressDto findById(UUID id) {
        return super.findById(id);
    }

    @Override
    @CachePut(key = "#result.addressId")
    public GetAddressDto create(PostAddressDto dto) {
        return super.create(dto);
    }

    @Override
    @CachePut(key = "#id")
    public GetAddressDto update(UUID id, PostAddressDto dto) {
        return super.update(id, dto);
    }

    @Override
    @CacheEvict(key = "#id")
    public void deleteById(UUID id) {
        super.deleteById(id);
    }

    @Override
    protected boolean dataValidatorControl(PostAddressDto dto) { return true; }

    @Override
    protected String getEntityName() {
        return "address";
    }
}
