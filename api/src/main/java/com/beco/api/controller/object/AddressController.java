package com.beco.api.controller.object;

import com.beco.api.config.sse.SseService;
import com.beco.api.controller.AbstractCrudController;
import com.beco.api.model.dto.AddressDto;
import com.beco.api.model.dto.PostAddressDto;
import com.beco.api.model.entity.Address;
import com.beco.api.service.AbstractCrudService;
import com.beco.api.service.object.AddressService;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/addresses")
@CrossOrigin(origins = "http://localhost:4200")
public class AddressController extends AbstractCrudController<Address, AddressDto, PostAddressDto, UUID> {

    private final AddressService service;

    public AddressController(
            AddressService service,
            SseService sseService
    ) {
        super(sseService);
        this.service = service;
    }

    @Override
    protected AbstractCrudService<Address, AddressDto, PostAddressDto, UUID> getService() {

        return service;
    }
}
