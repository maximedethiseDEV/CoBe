package com.beco.api.controller.object;

import com.beco.api.config.sse.SseService;
import com.beco.api.controller.AbstractCrudController;
import com.beco.api.model.dto.SharedDetailsDto;
import com.beco.api.model.entity.SharedDetails;
import com.beco.api.service.AbstractCrudService;
import com.beco.api.service.object.SharedDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/shared-details")
@CrossOrigin(origins = "http://localhost:4200")
public class SharedDetailsController extends AbstractCrudController<SharedDetails, SharedDetailsDto, SharedDetailsDto, Integer> {

    private final SharedDetailsService service;

    public SharedDetailsController(
            SharedDetailsService service,
            SseService sseService
    ) {
        super(sseService);
        this.service = service;
    }

    @Override
    protected AbstractCrudService<SharedDetails, SharedDetailsDto, SharedDetailsDto, Integer> getService() {

        return service;
    }
}
