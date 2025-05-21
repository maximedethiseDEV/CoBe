package com.beco.api.service;

import com.beco.api.model.Customer;
import com.beco.api.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    private final CustomerRepository clientRepository;

    public CustomerService(CustomerRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    // Récupérer tous les clients
    public List<Customer> getAllCustomers() {
        return clientRepository.findAll();
    }

    // Récupérer un client par ID
    public Optional<Customer> getCustomerById(Integer id) {
        return clientRepository.findById(id);
    }
}
