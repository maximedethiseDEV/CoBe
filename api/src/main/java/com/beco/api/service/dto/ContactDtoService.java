package com.beco.api.service.dto;

import com.beco.api.model.Contact;
import com.beco.api.repository.ContactRepository;
import com.beco.api.service.CrudService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactDtoService implements CrudService<Contact, Integer> {

    private final ContactRepository repository;

    public ContactDtoService(ContactRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Contact> findAll() {
        return repository.findAll();
    }

    @Override
    public Contact findById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Contact n°" + id + " non trouvée"));
    }

    @Override
    public Contact create(Contact entity) {
        return null;
    }

    @Override
    public Contact update(Integer integer, Contact entity) {
        return null;
    }

    public void deleteById(Integer id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Contact n°" + id + " non trouvée");
        }
        repository.deleteById(id);
    }

    public Contact findByEmail(String email) {
        return repository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Contact avec l'email " + email + " non trouvée"));
    }
}
