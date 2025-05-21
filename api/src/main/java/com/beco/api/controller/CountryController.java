package com.beco.api.controller;

import com.beco.api.model.Country;
import com.beco.api.service.CountryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
public class CountryController {

    private final CountryService countryService;

    public CountryController(CountryService countryService) {
        this.countryService = countryService;
    }

    @GetMapping("/countries")
    public ResponseEntity<List<Country>> getAllCountries() {
        List<Country> countries = countryService.getAllCountries();
        return ResponseEntity.ok(countries);
    }

    @GetMapping("/country/{id}")
    public ResponseEntity<Country> getCountryById(@PathVariable Integer id) {
        return countryService.getCountryById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/country")
    public ResponseEntity<Country> createOrUpdateCountry(@RequestBody Country country) {
        Country savedCountry = countryService.saveCountry(country);
        return ResponseEntity.ok(savedCountry);
    }

    @DeleteMapping("/country/{id}")
    public ResponseEntity<Void> deleteCountry(@PathVariable Integer id) {
        countryService.deleteCountryById(id);
        return ResponseEntity.noContent().build();
    }
}
