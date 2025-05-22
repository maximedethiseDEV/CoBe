package com.beco.api.service.dto;

import com.beco.api.model.Customer;
import com.beco.api.repository.CustomerRepository;
import com.beco.api.service.CrudService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerDtoService implements CrudService<Customer, Integer> {

    private final CustomerRepository repository;

    public CustomerDtoService(CustomerRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Customer> findAll() {
        return List.of();
    }

    @Override
    public Customer findById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Customer n°" + id + " non trouvée"));
    }

    @Override
    public Customer create(Customer entity) {
        return null;
    }

    @Override
    public Customer update(Integer integer, Customer entity) {
        return null;
    }

    public void deleteById(Integer id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Customer n°" + id + " non trouvée");
        }
        repository.deleteById(id);
    }
}
