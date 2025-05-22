package com.beco.api.controller;

import com.beco.api.model.Customer;
import com.beco.api.service.dto.CustomerDtoService;
import com.beco.api.service.CrudService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customers")
@CrossOrigin(origins = "http://localhost:4200")
public class CustomerController extends AbstractCrudController<Customer, Integer> {

    private final CustomerDtoService customerDtoService;

    public CustomerController(CustomerDtoService customerDtoService) {
        this.customerDtoService = customerDtoService;
    }

    @Override
    protected CrudService<Customer, Integer> getService() {
        return customerDtoService;
    }
}
