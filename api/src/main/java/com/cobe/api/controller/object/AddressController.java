package com.cobe.api.controller.object;

import com.cobe.api.config.sse.SseService;
import com.cobe.api.controller.AbstractCrudController;
import com.cobe.api.model.dto.AddressDto;
import com.cobe.api.model.dto.PostAddressDto;
import com.cobe.api.model.entity.Address;
import com.cobe.api.service.AbstractCrudService;
import com.cobe.api.service.object.AddressService;
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
