package com.beco.api.controller.object;

import com.beco.api.config.sse.SseService;
import com.beco.api.controller.AbstractCrudController;
import com.beco.api.model.dto.CityDto;
import com.beco.api.model.dto.DeliveryStatusDto;
import com.beco.api.model.dto.PostCityDto;
import com.beco.api.model.entity.City;
import com.beco.api.model.entity.DeliveryStatus;
import com.beco.api.service.AbstractCrudService;
import com.beco.api.service.object.CityService;
import com.beco.api.service.object.DeliveryStatusService;
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
