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

    private final AddressService service;

    public AddressController(
            AddressService service,
            SseService sseService
    ) {
        super(sseService);
        this.service = service;
    }

    @Override
    protected AbstractCrudService<Address, GetAddressDto, PostAddressDto, Integer> getService() {

        return service;
    }
}
