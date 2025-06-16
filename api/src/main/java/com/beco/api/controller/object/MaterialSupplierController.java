package com.beco.api.controller.object;

import com.beco.api.config.sse.SseService;
import com.beco.api.controller.AbstractCrudController;
import com.beco.api.model.dto.MaterialSupplierDto;
import com.beco.api.model.entity.MaterialSupplier;
import com.beco.api.service.AbstractCrudService;
import com.beco.api.service.object.MaterialSupplierService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/material-suppliers")
@CrossOrigin(origins = "http://localhost:4200")
public class MaterialSupplierController extends AbstractCrudController<MaterialSupplier, MaterialSupplierDto, MaterialSupplierDto, UUID> {

    private final MaterialSupplierService service;

    public MaterialSupplierController(
            MaterialSupplierService service,
            SseService sseService
    ) {
        super(sseService);
        this.service = service;
    }

    @Override
    protected AbstractCrudService<MaterialSupplier, MaterialSupplierDto, MaterialSupplierDto, UUID> getService() {

        return service;
    }
}
