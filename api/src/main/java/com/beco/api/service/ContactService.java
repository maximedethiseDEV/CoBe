package com.beco.api.service;

import com.beco.api.model.Contact;
import com.beco.api.repository.ContactRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService implements CrudService<Contact, Integer> {

    private final ContactRepository repository;

    public ContactService(ContactRepository repository) {
        this.repository = repository;
    }

    public List<Contact> findAll() {
        return repository.findAll();
    }

    public Contact findById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Contact n°" + id + " non trouvée"));
    }

    public Contact save(Contact contact) {
        return repository.save(contact);
    }

    public void deleteById(Integer id) {
        repository.deleteById(id);
    }

}
