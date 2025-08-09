package com.beco.api.controller.object;

import com.beco.api.config.sse.SseService;
import com.beco.api.controller.AbstractCrudController;
import com.beco.api.model.dto.DeliveryOrderNumberDto;
import com.beco.api.model.dto.PostDeliveryOrderNumberDto;
import com.beco.api.model.entity.DeliveryOrderNumber;
import com.beco.api.service.AbstractCrudService;
import com.beco.api.service.object.DeliveryOrderNumberService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/unique-delivery-numbers")
@CrossOrigin(origins = "http://localhost:4200")
public class DeliveryOrderNumberController extends AbstractCrudController<DeliveryOrderNumber, DeliveryOrderNumberDto, PostDeliveryOrderNumberDto, UUID> {

    private final DeliveryOrderNumberService service;

    public DeliveryOrderNumberController(
            DeliveryOrderNumberService service,
            SseService sseService
    ) {
        super(sseService);
        this.service = service;
    }

    @Override
    protected AbstractCrudService<DeliveryOrderNumber, DeliveryOrderNumberDto, PostDeliveryOrderNumberDto, UUID> getService() {

        return service;
    }
}
