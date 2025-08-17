package com.cobe.api.controller.object;

import com.cobe.api.config.sse.SseService;
import com.cobe.api.controller.AbstractCrudController;
import com.cobe.api.model.dto.PostTransportSupplierDto;
import com.cobe.api.model.dto.TransportSupplierDto;
import com.cobe.api.model.entity.TransportSupplier;
import com.cobe.api.service.AbstractCrudService;
import com.cobe.api.service.object.TransportSupplierService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/transport-suppliers")
@CrossOrigin(origins = "http://localhost:4200")
public class TransportSupplierController extends AbstractCrudController<TransportSupplier, TransportSupplierDto, PostTransportSupplierDto, UUID> {

    private final TransportSupplierService service;

    public TransportSupplierController(
            TransportSupplierService service,
            SseService sseService
    ) {
        super(sseService);
        this.service = service;
    }

    @Override
    protected AbstractCrudService<TransportSupplier, TransportSupplierDto, PostTransportSupplierDto, UUID> getService() {

        return service;
    }
}
