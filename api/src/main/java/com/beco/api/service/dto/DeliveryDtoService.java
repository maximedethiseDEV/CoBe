package com.beco.api.service.dto;

import com.beco.api.model.Delivery;
import com.beco.api.service.CrudService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeliveryDtoService implements CrudService<Delivery, Integer> {

    @Override
    public List<Delivery> findAll() {
        return List.of();
    }

    @Override
    public Delivery findById(Integer integer) {
        return null;
    }

    @Override
    public Delivery create(Delivery entity) {
        return null;
    }

    @Override
    public Delivery update(Integer integer, Delivery entity) {
        return null;
    }

    @Override
    public void deleteById(Integer integer) {

    }
}
