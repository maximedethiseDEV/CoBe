package com.cobe.api.controller.object;

import com.cobe.api.config.sse.SseService;
import com.cobe.api.controller.AbstractCrudController;
import com.cobe.api.model.dto.DeliveryStatusDto;
import com.cobe.api.model.entity.DeliveryStatus;
import com.cobe.api.service.AbstractCrudService;
import com.cobe.api.service.object.DeliveryStatusService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/delivery-status")
@CrossOrigin(origins = "http://localhost:4200")
public class DeliveryStatusController extends AbstractCrudController<DeliveryStatus, DeliveryStatusDto, DeliveryStatusDto, UUID> {

    private final DeliveryStatusService service;

    public DeliveryStatusController(
            DeliveryStatusService service,
            SseService sseService
    ) {
        super(sseService);
        this.service = service;
    }

    @Override
    protected AbstractCrudService<DeliveryStatus, DeliveryStatusDto, DeliveryStatusDto, UUID> getService() {

        return service;
    }
}
