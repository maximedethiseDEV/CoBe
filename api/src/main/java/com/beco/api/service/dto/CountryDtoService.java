package com.beco.api.service.dto;

import com.beco.api.model.Country;
import com.beco.api.repository.CountryRepository;
import com.beco.api.service.CrudService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryDtoService implements CrudService<Country, Integer> {

    private final CountryRepository repository;

    public CountryDtoService(CountryRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Country> findAll() {
        return repository.findAll();
    }

    @Override
    public Country findById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Country n°" + id + " non trouvée"));
    }

    @Override
    public Country create(Country entity) {
        return null;
    }

    @Override
    public Country update(Integer integer, Country entity) {
        return null;
    }

    public void deleteById(Integer id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Country n°" + id + " non trouvée");
        }
        repository.deleteById(id);
    }
}
