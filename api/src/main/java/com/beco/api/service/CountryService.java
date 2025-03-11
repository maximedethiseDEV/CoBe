package com.beco.api.service;

import com.beco.api.model.Country;
import com.beco.api.repository.CountryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CountryService {

    private final CountryRepository countryRepository;

    public CountryService(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    // Récupérer tous les pays
    public List<Country> getAllCountries() {
        return countryRepository.findAll();
    }

    // Récupérer un pays par ID
    public Optional<Country> getCountryById(String id) {
        return countryRepository.findById(id);
    }

    // Créer ou mettre à jour un pays
    public Country saveCountry(Country country) {
        return countryRepository.save(country);
    }

    // Supprimer un pays par ID
    public void deleteCountryById(String id) {
        countryRepository.deleteById(id);
    }
}
