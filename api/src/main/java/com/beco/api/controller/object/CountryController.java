package com.beco.api.controller.object;

import com.beco.api.config.sse.SseService;
import com.beco.api.controller.AbstractCrudController;
import com.beco.api.model.dto.CountryDto;
import com.beco.api.model.entity.Country;
import com.beco.api.service.AbstractCrudService;
import com.beco.api.service.object.CountryService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/countries")
@CrossOrigin(origins = "http://localhost:4200")
public class CountryController extends AbstractCrudController<Country, CountryDto, CountryDto, Integer> {

    private final CountryService service;

    public CountryController(
            CountryService service,
            SseService sseService
    ) {
        super(sseService);
        this.service = service;
    }

    @Override
    protected AbstractCrudService<Country, CountryDto, CountryDto, Integer> getService() {

        return service;
    }
}
