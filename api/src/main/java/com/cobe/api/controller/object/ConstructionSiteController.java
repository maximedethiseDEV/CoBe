package com.cobe.api.controller.object;

import com.cobe.api.config.sse.SseService;
import com.cobe.api.controller.AbstractCrudController;
import com.cobe.api.model.dto.ConstructionSiteDto;
import com.cobe.api.model.dto.PostConstructionSiteDto;
import com.cobe.api.model.entity.ConstructionSite;
import com.cobe.api.service.AbstractCrudService;
import com.cobe.api.service.object.ConstructionSiteService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/construction-sites")
@CrossOrigin(origins = "http://localhost:4200")
public class ConstructionSiteController extends AbstractCrudController<ConstructionSite, ConstructionSiteDto, PostConstructionSiteDto, UUID> {

    private final ConstructionSiteService service;

    public ConstructionSiteController(
            ConstructionSiteService service,
            SseService sseService
    ) {
        super(sseService);
        this.service = service;
    }

    @Override
    protected AbstractCrudService<ConstructionSite, ConstructionSiteDto, PostConstructionSiteDto, UUID> getService() {

        return service;
    }
}
