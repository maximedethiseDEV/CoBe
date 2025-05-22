package com.beco.api.controller;

import com.beco.api.service.CrudService;
import jakarta.persistence.Id;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Field;
import java.util.List;

public abstract class AbstractCrudController<DTO, ID> {

    protected abstract CrudService<DTO, ID> getService();

    @GetMapping
    public ResponseEntity<List<DTO>> getAll() {
        return ResponseEntity.ok(getService().findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DTO> getById(@PathVariable ID id) {
        return ResponseEntity.ok(getService().findById(id));
    }

    @PostMapping
    public ResponseEntity<DTO> create(@RequestBody DTO entity) {
        return ResponseEntity.ok(getService().create(entity));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DTO> update(@PathVariable ID id, @RequestBody DTO entity) {
        if (!assignIdToEntity(entity, id)) {
            throw new IllegalArgumentException("Impossible de définir l'ID sur l'entité, vérifiez les annotations @Id.");
        }
        return ResponseEntity.ok(getService().update(id,entity));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable ID id) {
        getService().deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private boolean assignIdToEntity(DTO entity, ID id) {
        Field idField = findIdField(entity.getClass());
        if (idField == null) {
            return false;
        }
        try {
            idField.setAccessible(true);
            idField.set(entity, id);
            return true;
        } catch (IllegalAccessException e) {
            return false;
        }
    }

    private Field findIdField(Class<?> entityClass) {
        for (Field field : entityClass.getDeclaredFields()) {
            if (field.isAnnotationPresent(Id.class)) {
                return field;
            }
        }
        return null;
    }
}