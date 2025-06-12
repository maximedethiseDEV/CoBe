package com.beco.api.controller.object;

import com.beco.api.config.sse.SseService;
import com.beco.api.controller.AbstractCrudController;
import com.beco.api.model.dto.ConstructionSiteDto;
import com.beco.api.model.entity.ConstructionSite;
import com.beco.api.service.AbstractCrudService;
import com.beco.api.service.object.ConstructionSiteService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/construction-sites")
@CrossOrigin(origins = "http://localhost:4200")
public class ConstructionSiteController extends AbstractCrudController<ConstructionSite, ConstructionSiteDto, ConstructionSiteDto, Integer> {

    private final ConstructionSiteService service;

    public ConstructionSiteController(
            ConstructionSiteService service,
            SseService sseService
    ) {
        super(sseService);
        this.service = service;
    }

    @Override
    protected AbstractCrudService<ConstructionSite, ConstructionSiteDto, ConstructionSiteDto, Integer> getService() {

        return service;
    }
}
