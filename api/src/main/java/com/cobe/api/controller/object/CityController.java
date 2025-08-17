package com.cobe.api.controller.object;

import com.cobe.api.config.sse.SseService;
import com.cobe.api.controller.AbstractCrudController;
import com.cobe.api.model.dto.CityDto;
import com.cobe.api.model.dto.PostCityDto;
import com.cobe.api.model.entity.City;
import com.cobe.api.service.AbstractCrudService;
import com.cobe.api.service.object.CityService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/cities")
@CrossOrigin(origins = "http://localhost:4200")
public class CityController extends AbstractCrudController<City, CityDto, PostCityDto, UUID> {

    private final CityService service;

    public CityController(
            CityService service,
            SseService sseService
    ) {
        super(sseService);
        this.service = service;
    }

    @Override
    protected AbstractCrudService<City, CityDto, PostCityDto, UUID> getService() {

        return service;
    }
}
