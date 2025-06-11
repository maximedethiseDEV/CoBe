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

@RestController
@RequestMapping("/material-suppliers")
@CrossOrigin(origins = "http://localhost:4200")
public class MaterialSupplierController extends AbstractCrudController<MaterialSupplier, MaterialSupplierDto, MaterialSupplierDto, Integer> {

    private final MaterialSupplierService addressService;

    public MaterialSupplierController(
            MaterialSupplierService addressService,
            SseService sseService
    ) {
        super(sseService);
        this.addressService = addressService;
    }

    @Override
    protected AbstractCrudService<MaterialSupplier, MaterialSupplierDto, MaterialSupplierDto, Integer> getService() {

        return addressService;
    }
}
