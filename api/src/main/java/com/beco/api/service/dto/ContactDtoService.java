package com.beco.api.service.dto;

import com.beco.api.dto.ContactDto;
import com.beco.api.mapper.ContactMapper;
import com.beco.api.model.Contact;
import com.beco.api.repository.ContactRepository;
import com.beco.api.service.CrudService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ContactDtoService implements CrudService<ContactDto, Integer> {

    private final ContactRepository repository;
    private final ContactMapper mapper;

    public ContactDtoService(ContactRepository repository, ContactMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public List<ContactDto> findAll() {
        return repository.findAll()
                .stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public ContactDto findById(Integer id) {
        Contact contact = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Contact n°" + id + " introuvable"));
        return mapper.toDto(contact);
    }

    @Override
    public ContactDto create(ContactDto contactDto) {
        if (repository.findByEmail(contactDto.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Un contact avec cet email existe déjà !");
        }
        Contact contact = mapper.toEntity(contactDto);
        Contact savedContact = repository.save(contact);
        return mapper.toDto(savedContact);
    }

    @Override
    public ContactDto update(Integer id, ContactDto contactDto) {
        // Vérifier si le contact avec cet ID existe
        Contact existingContact = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Contact n°" + id + " introuvable"));

        // Mettre à jour les champs depuis le DTO, tout en conservant l'ID
        mapper.updateContactFromDto(contactDto, existingContact);

        // Sauvegarder les modifications dans la base de données
        Contact updatedContact = repository.save(existingContact);
        return mapper.toDto(updatedContact);
    }

    @Override
    public void deleteById(Integer id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Contact n°" + id + " introuvable");
        }
        repository.deleteById(id);
    }

    // Récupérer les contacts par email, exemple additionnel
    public ContactDto findByEmail(String email) {
        Contact contact = repository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Contact avec l'email " + email + " introuvable"));
        return mapper.toDto(contact);
    }
}