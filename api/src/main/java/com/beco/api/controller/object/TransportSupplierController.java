package com.beco.api.controller.object;

import com.beco.api.config.sse.SseService;
import com.beco.api.controller.AbstractCrudController;
import com.beco.api.model.dto.TransportSupplierDto;
import com.beco.api.model.entity.TransportSupplier;
import com.beco.api.service.AbstractCrudService;
import com.beco.api.service.object.TransportSupplierService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/transport-suppliers")
@CrossOrigin(origins = "http://localhost:4200")
public class TransportSupplierController extends AbstractCrudController<TransportSupplier, TransportSupplierDto, TransportSupplierDto, Integer> {

    private final TransportSupplierService service;

    public TransportSupplierController(
            TransportSupplierService service,
            SseService sseService
    ) {
        super(sseService);
        this.service = service;
    }

    @Override
    protected AbstractCrudService<TransportSupplier, TransportSupplierDto, TransportSupplierDto, Integer> getService() {

        return service;
    }
}
