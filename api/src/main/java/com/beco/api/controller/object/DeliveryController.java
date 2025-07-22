package com.beco.api.controller.object;

import com.beco.api.config.sse.SseService;
import com.beco.api.controller.AbstractCrudController;
import com.beco.api.model.dto.DeliveryDto;
import com.beco.api.model.entity.Delivery;
import com.beco.api.service.AbstractCrudService;
import com.beco.api.service.object.DeliveryService;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/deliveries")
@CrossOrigin(origins = "http://localhost:4200")
public class DeliveryController extends AbstractCrudController<Delivery, DeliveryDto, DeliveryDto, UUID> {

    private final DeliveryService service;

    public DeliveryController(
            DeliveryService service,
            SseService sseService
    ) {
        super(sseService);
        this.service = service;
    }

    @Override
    protected AbstractCrudService<Delivery, DeliveryDto, DeliveryDto, UUID> getService() {

        return service;
    }
}