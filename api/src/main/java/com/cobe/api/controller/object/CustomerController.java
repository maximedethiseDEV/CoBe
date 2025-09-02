package com.cobe.api.controller.object;

import com.cobe.api.config.sse.SseService;
import com.cobe.api.controller.AbstractCrudController;
import com.cobe.api.model.dto.CustomerDto;
import com.cobe.api.model.dto.PostCustomerDto;
import com.cobe.api.model.entity.Customer;
import com.cobe.api.service.AbstractCrudService;
import com.cobe.api.service.object.CustomerService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/customers")
@CrossOrigin(origins = "http://localhost:4200")
public class CustomerController extends AbstractCrudController<Customer, CustomerDto, PostCustomerDto, UUID> {

    private final CustomerService service;

    public CustomerController(
            CustomerService service,
            SseService sseService
    ) {
        super(sseService);
        this.service = service;
    }

    @Override
    protected AbstractCrudService<Customer, CustomerDto, PostCustomerDto, UUID> getService() {

        return service;
    }
}
