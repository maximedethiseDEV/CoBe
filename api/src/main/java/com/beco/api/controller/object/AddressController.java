package com.beco.api.controller.object;

import com.beco.api.config.sse.SseService;
import com.beco.api.controller.AbstractCrudController;
import com.beco.api.model.dto.GetAddressDto;
import com.beco.api.model.dto.PostAddressDto;
import com.beco.api.model.entity.Address;
import com.beco.api.service.AbstractCrudService;
import com.beco.api.service.object.AddressService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/addresses")
@CrossOrigin(origins = "http://localhost:4200")
public class AddressController extends AbstractCrudController<Address, GetAddressDto, PostAddressDto, Integer> {

    private final AddressService addressService;

    public AddressController(
            AddressService addressService,
            SseService sseService
    ) {
        super(sseService);
        this.addressService = addressService;
    }

    @Override
    protected AbstractCrudService<Address, GetAddressDto, PostAddressDto, Integer> getService() {

        return addressService;
    }
}
