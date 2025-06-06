package com.beco.api.controller.object;

import com.beco.api.config.sse.SseService;
import com.beco.api.controller.AbstractCrudController;
import com.beco.api.model.dto.DeliveryDto;
import com.beco.api.model.entity.Delivery;
import com.beco.api.service.AbstractCrudService;
import com.beco.api.service.object.DeliveryService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/deliveries")
@CrossOrigin(origins = "http://localhost:4200")
public class DeliveryController extends AbstractCrudController<Delivery, DeliveryDto, DeliveryDto, Integer> {

    private final DeliveryService deliveryService;

    public DeliveryController(
            DeliveryService deliveryService,
            SseService sseService
    ) {
        super(sseService);
        this.deliveryService = deliveryService;
    }

    @Override
    protected AbstractCrudService<Delivery, DeliveryDto, DeliveryDto, Integer> getService() {

        return deliveryService;
    }
}
