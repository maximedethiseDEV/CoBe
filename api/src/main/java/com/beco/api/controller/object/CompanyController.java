package com.beco.api.controller.object;

import com.beco.api.config.sse.SseService;
import com.beco.api.controller.AbstractCrudController;
import com.beco.api.model.dto.CompanyDto;
import com.beco.api.model.dto.PostCompanyDto;
import com.beco.api.model.entity.Company;
import com.beco.api.service.AbstractCrudService;
import com.beco.api.service.object.CompanyService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/companies")
@CrossOrigin(origins = "http://localhost:4200")
public class CompanyController extends AbstractCrudController<Company, CompanyDto, PostCompanyDto, UUID> {

    private final CompanyService service;

    public CompanyController(
            CompanyService service,
            SseService sseService
    ) {
        super(sseService);
        this.service = service;
    }

    @Override
    protected AbstractCrudService<Company, CompanyDto, PostCompanyDto, UUID> getService() {

        return service;
    }
}
