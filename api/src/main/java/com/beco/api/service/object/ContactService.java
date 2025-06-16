package com.beco.api.service.object;

import com.beco.api.model.dto.ContactDto;
import com.beco.api.mapper.ContactMapper;
import com.beco.api.model.entity.Contact;
import com.beco.api.repository.ContactRepository;
import com.beco.api.service.AbstractCrudService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;


@Service
@CacheConfig(cacheNames = "contacts")
public class ContactService extends AbstractCrudService<Contact, ContactDto, ContactDto, UUID> {

    private final ContactRepository repository;
    private final ContactMapper mapper;

    public ContactService(
            ContactRepository repository,
            CacheManager cacheManager,
            ContactMapper mapper
    ) {
        super(
                repository,
                cacheManager,
                mapper::toDto,
                mapper::toEntity,
                mapper::updateContactFromDto
        );
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    @Cacheable(key = "'all'")
    public List<ContactDto> findAll() {
        return super.findAll();
    }

    @Override
    @Cacheable(key = "#id")
    public ContactDto findById(UUID id) {
        return super.findById(id);
    }

    @Override
    @CachePut(key = "#result.contactId")
    @CacheEvict(value = "contacts", key = "'all'")
    public ContactDto create(ContactDto contactDto) {
        return super.create(contactDto);
    }

    @Override
    @CachePut(key = "#id")
    @CacheEvict(value = "contacts", key = "'all'")
    public ContactDto update(UUID id, ContactDto contactDto) {
        return super.update(id, contactDto);
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
    protected boolean dataValidatorControl(ContactDto dto) {
        return true;
    }

    @Override
    protected String getEntityName() {
        return "contact";
    }

    // Récupérer les contacts par email
    public ContactDto findByEmail(String email) {
        Contact contact = repository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Contact avec l'email " + email + " introuvable"));
        return mapper.toDto(contact);
    }
}