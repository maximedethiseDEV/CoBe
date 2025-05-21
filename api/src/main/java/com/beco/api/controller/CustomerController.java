package com.beco.api.controller;

import com.beco.api.model.Customer;
import com.beco.api.service.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
public class CustomerController {

    private final CustomerService clientService;

    public CustomerController(CustomerService clientService) {
        this.clientService = clientService;
    }

    @GetMapping("/clients")
    public ResponseEntity<List<Customer>> getAllCustomers() {
        List<Customer> clients = clientService.getAllCustomers();
        return ResponseEntity.ok(clients);
    }

    @GetMapping("/client/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Integer id) {
        return clientService.getCustomerById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
