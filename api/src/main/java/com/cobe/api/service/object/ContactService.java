package com.cobe.api.service.object;

import com.cobe.api.model.dto.ContactDto;
import com.cobe.api.mapper.ContactMapper;
import com.cobe.api.model.entity.Contact;
import com.cobe.api.repository.ContactRepository;
import com.cobe.api.service.AbstractCrudService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.*;
import org.springframework.stereotype.Service;

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