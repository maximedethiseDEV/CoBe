package com.beco.api.controller;

import com.beco.api.model.Address;
import com.beco.api.service.dto.AddressDtoService;
import com.beco.api.service.CrudService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/addresses")
@CrossOrigin(origins = "http://localhost:4200")
public class AddressController extends AbstractCrudController<Address, Integer> {

    private final AddressDtoService addressDtoService;

    public AddressController(AddressDtoService addressDtoService) {
        this.addressDtoService = addressDtoService;
    }

    @Override
    protected CrudService<Address, Integer> getService() {
        return addressDtoService;
    }
}
