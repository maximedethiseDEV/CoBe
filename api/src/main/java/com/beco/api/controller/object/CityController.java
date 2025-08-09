package com.beco.api.controller.object;

import com.beco.api.config.sse.SseService;
import com.beco.api.controller.AbstractCrudController;
import com.beco.api.model.dto.CityDto;
import com.beco.api.model.dto.PostCityDto;
import com.beco.api.model.entity.City;
import com.beco.api.service.AbstractCrudService;
import com.beco.api.service.object.CityService;
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
