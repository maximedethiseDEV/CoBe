package com.beco.api.controller.object;

import com.beco.api.config.sse.SseService;
import com.beco.api.controller.AbstractCrudController;
import com.beco.api.model.dto.CustomerDto;
import com.beco.api.model.entity.Customer;
import com.beco.api.service.AbstractCrudService;
import com.beco.api.service.object.CustomerService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customers")
@CrossOrigin(origins = "http://localhost:4200")
public class CustomerController extends AbstractCrudController<Customer, CustomerDto, CustomerDto, Integer> {

    private final CustomerService customerService;

    public CustomerController(
            CustomerService customerService,
            SseService sseService
    ) {
        super(sseService);
        this.customerService = customerService;
    }

    @Override
    protected AbstractCrudService<Customer, CustomerDto, CustomerDto, Integer> getService() {

        return customerService;
    }
}
