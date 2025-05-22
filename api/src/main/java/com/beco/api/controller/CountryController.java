package com.beco.api.controller;

import com.beco.api.model.Country;
import com.beco.api.service.dto.CountryDtoService;
import com.beco.api.service.CrudService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/countries")
@CrossOrigin(origins = "http://localhost:4200")
public class CountryController extends AbstractCrudController<Country, Integer> {

    private final CountryDtoService countryDtoService;

    public CountryController(CountryDtoService countryDtoService) {
        this.countryDtoService = countryDtoService;
    }

    @Override
    protected CrudService<Country, Integer> getService() {
        return countryDtoService;
    }
}
