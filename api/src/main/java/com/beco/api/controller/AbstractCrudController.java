package com.beco.api.controller;

import com.beco.api.config.sse.SseEventMessage;
import com.beco.api.config.sse.SseService;
import com.beco.api.service.AbstractCrudService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;
import java.util.Map;
import java.util.concurrent.*;

public abstract class AbstractCrudController<ENTITY, GetRequest_DTO, PostOrPutRequest_DTO, UUID> {

    private final SseService sseService;
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(10);
    private final Map<String, ScheduledFuture<?>> heartbeatTasks = new ConcurrentHashMap<>();

    protected AbstractCrudController(SseService sseService) {
        this.sseService = sseService;
    }

    protected abstract AbstractCrudService<ENTITY, GetRequest_DTO, PostOrPutRequest_DTO, UUID> getService();

    @GetMapping
    public ResponseEntity<List<GetRequest_DTO>> getAll() {
        return ResponseEntity.ok(getService().findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GetRequest_DTO> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(getService().findById(id));
    }

    @PostMapping
    public ResponseEntity<GetRequest_DTO> create(@RequestBody PostOrPutRequest_DTO entity) {
        GetRequest_DTO createdEntity = getService().create(entity);

        String entityPath = getEntityPath();
        sseService.broadcastToEntity(entityPath,
                new SseEventMessage("CREATE", entityPath, createdEntity));

        return ResponseEntity.ok(createdEntity);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GetRequest_DTO> update(@PathVariable UUID id, @RequestBody PostOrPutRequest_DTO entity) {
        GetRequest_DTO updatedEntity = getService().update(id, entity);

        String entityPath = getEntityPath();
        sseService.broadcastToEntity(entityPath, new SseEventMessage("UPDATE", entityPath, updatedEntity));

        return ResponseEntity.ok(updatedEntity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        try {
            getService().deleteById(id);
            String entityPath = getEntityPath();
            sseService.broadcastToEntity(entityPath, new SseEventMessage("DELETE", entityPath, id));
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            System.err.println("Erreur lors de la suppression ou diffusion SSE : " + e.getMessage());
            throw e;
        }
    }

    @GetMapping(value = "/subscribe", produces = "text/event-stream")
    public SseEmitter subscribe(Authentication authentication) {
        String userId = authentication.getName();
        String entityPath = getEntityPath();

        SseEmitter emitter = sseService.subscribeToEntity(entityPath);

        ScheduledFuture<?> heartbeatTask = scheduler.scheduleAtFixedRate(
                () -> {
                    sseService.sendHeartbeat(entityPath); // Peut lever une exception
                },
                0,
                30,
                TimeUnit.SECONDS
        );

        heartbeatTasks.put(userId + ":" + entityPath, heartbeatTask);

        emitter.onCompletion(() -> cleanupHeartbeat(userId + ":" + entityPath));
        emitter.onTimeout(() -> cleanupHeartbeat(userId + ":" + entityPath));
        emitter.onError((ex) -> {
            cleanupHeartbeat(userId + ":" + entityPath);
            // On relance une exception pour qu’elle soit capturée par @ExceptionHandler
            throw new RuntimeException("Erreur SSE sur la connexion", ex);
        });

        return emitter;
    }


    private void cleanupHeartbeat(String key) {
        ScheduledFuture<?> task = heartbeatTasks.remove(key);
        if (task != null) {
            task.cancel(true);
            System.out.println("Tâche heartbeat annulée pour " + key);
        }
    }


    private String getEntityPath() {
        RequestMapping annotation = this.getClass().getAnnotation(RequestMapping.class);
        if (annotation != null && annotation.value().length > 0) {
            return annotation.value()[0];
        }
        throw new IllegalStateException("RequestMapping introuvable sur le contrôleur.");
    }
}
