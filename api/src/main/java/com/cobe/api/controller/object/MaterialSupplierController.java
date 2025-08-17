package com.cobe.api.controller.object;

import com.cobe.api.config.sse.SseService;
import com.cobe.api.controller.AbstractCrudController;
import com.cobe.api.model.dto.MaterialSupplierDto;
import com.cobe.api.model.dto.PostMaterialSupplierDto;
import com.cobe.api.model.entity.MaterialSupplier;
import com.cobe.api.service.AbstractCrudService;
import com.cobe.api.service.object.MaterialSupplierService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/material-suppliers")
@CrossOrigin(origins = "http://localhost:4200")
public class MaterialSupplierController extends AbstractCrudController<MaterialSupplier, MaterialSupplierDto, PostMaterialSupplierDto, UUID> {

    private final MaterialSupplierService service;

    public MaterialSupplierController(
            MaterialSupplierService service,
            SseService sseService
    ) {
        super(sseService);
        this.service = service;
    }

    @Override
    protected AbstractCrudService<MaterialSupplier, MaterialSupplierDto, PostMaterialSupplierDto, UUID> getService() {

        return service;
    }
}
