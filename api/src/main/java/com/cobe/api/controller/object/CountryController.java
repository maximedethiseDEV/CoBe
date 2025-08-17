package com.cobe.api.controller.object;

import com.cobe.api.config.sse.SseService;
import com.cobe.api.controller.AbstractCrudController;
import com.cobe.api.model.dto.CountryDto;
import com.cobe.api.model.entity.Country;
import com.cobe.api.service.AbstractCrudService;
import com.cobe.api.service.object.CountryService;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/countries")
@CrossOrigin(origins = "http://localhost:4200")
public class CountryController extends AbstractCrudController<Country, CountryDto, CountryDto, UUID> {

    private final CountryService service;

    public CountryController(
            CountryService service,
            SseService sseService
    ) {
        super(sseService);
        this.service = service;
    }

    @Override
    protected AbstractCrudService<Country, CountryDto, CountryDto, UUID> getService() {

        return service;
    }
}
