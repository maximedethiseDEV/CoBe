package com.beco.api.controller;

import com.beco.api.service.CrudService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

public abstract class AbstractCrudController<T, ID> {

    protected abstract CrudService<T, ID> getService();

    @GetMapping
    public ResponseEntity<List<T>> getAll() {
        return ResponseEntity.ok(getService().findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<T> getById(@PathVariable ID id) {
        return ResponseEntity.ok(getService().findById(id));
    }

    @PostMapping
    public ResponseEntity<T> create(@RequestBody T entity) {
        return ResponseEntity.ok(getService().save(entity));
    }

    @PutMapping("/{id}")
    public ResponseEntity<T> update(@PathVariable ID id, @RequestBody T entity) {
        setEntityId(entity, id).orElseThrow(() -> new IllegalArgumentException("Impossible de définir l'ID sur l'entité"));
        return ResponseEntity.ok(getService().save(entity));
    }

    private Optional<Void> setEntityId(T entity, ID id) {
        for (var field : entity.getClass().getDeclaredFields()) {
            if (field.isAnnotationPresent(jakarta.persistence.Id.class)) {
                try {
                    field.setAccessible(true);
                    field.set(entity, id);
                    return Optional.empty();
                } catch (IllegalAccessException e) {
                    return Optional.empty();
                }
            }
        }
        return Optional.empty();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable ID id) {
        getService().deleteById(id);
        return ResponseEntity.noContent().build();
    }
}