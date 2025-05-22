package com.beco.api.service.dto;

import com.beco.api.model.Address;
import com.beco.api.repository.AddressRepository;
import com.beco.api.service.CrudService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressDtoService implements CrudService<Address, Integer> {

    private final AddressRepository repository;

    public AddressDtoService(AddressRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Address> findAll() {
        return repository.findAll();
    }

    @Override
    public Address findById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Adresse n°" + id + " non trouvée"));
    }

    @Override
    public Address create(Address entity) {
        return null;
    }

    @Override
    public Address update(Integer integer, Address entity) {
        return null;
    }

    public void deleteById(Integer id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Adresse n°" + id + " non trouvée");
        }
        repository.deleteById(id);
    }
}
