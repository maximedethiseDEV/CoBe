package com.cobe.api.controller.object;

import com.cobe.api.config.sse.SseService;
import com.cobe.api.controller.AbstractCrudController;
import com.cobe.api.model.dto.DeliveryDto;
import com.cobe.api.model.dto.PostDeliveryDto;
import com.cobe.api.model.entity.Delivery;
import com.cobe.api.service.AbstractCrudService;
import com.cobe.api.service.object.DeliveryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/deliveries")
@CrossOrigin(origins = "http://localhost:4200")
public class DeliveryController extends AbstractCrudController<Delivery, DeliveryDto, PostDeliveryDto, UUID> {

    private final DeliveryService service;

    public DeliveryController(
            DeliveryService service,
            SseService sseService
    ) {
        super(sseService);
        this.service = service;
    }

    @Override
    protected AbstractCrudService<Delivery, DeliveryDto, PostDeliveryDto, UUID> getService() {

        return service;
    }

    @PostMapping("/send-mail/{id}")
    public ResponseEntity<Void> sendTest(@PathVariable UUID id) throws Exception {
        service.sendMailDelivery(id);
        return ResponseEntity.accepted().build();
    }
}