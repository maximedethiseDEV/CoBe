package com.cobe.api.controller.object;

import com.cobe.api.config.sse.SseEventMessage;
import com.cobe.api.config.sse.SseService;
import com.cobe.api.controller.AbstractCrudController;
import com.cobe.api.model.dto.SharedDetailsDto;
import com.cobe.api.model.entity.SharedDetails;
import com.cobe.api.service.AbstractCrudService;
import com.cobe.api.service.object.SharedDetailsService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@RequestMapping("/shared-details")
@CrossOrigin(origins = "http://localhost:4200")
public class SharedDetailsController extends AbstractCrudController<SharedDetails, SharedDetailsDto, SharedDetailsDto, UUID> {

    @Value("${app.upload.dir}")
    private String uploadDir;

    private final SharedDetailsService service;

    public SharedDetailsController(
            SharedDetailsService service,
            SseService sseService
    ) {
        super(sseService);
        this.service = service;
    }

    @Override
    protected AbstractCrudService<SharedDetails, SharedDetailsDto, SharedDetailsDto, UUID> getService() {

        return service;
    }

    @GetMapping("/upload/{id}")
    public ResponseEntity<Resource> getFileById(
            @PathVariable UUID id
    ) throws IOException {
        SharedDetailsDto sharedDetailsDto = service.findById(id);
        if (sharedDetailsDto == null || sharedDetailsDto.getFileName() == null) {
            return ResponseEntity.notFound().build();
        }

        Path filePath = Paths.get(uploadDir).resolve(sharedDetailsDto.getFileName()).normalize();
        Resource resource = new UrlResource(filePath.toUri());

        if (!resource.exists() || !resource.isReadable()) {
            return ResponseEntity.notFound().build();
        }

        String contentType = Files.probeContentType(filePath);
        if (contentType == null) {
            contentType = MediaType.APPLICATION_OCTET_STREAM_VALUE;
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<SharedDetailsDto> create(
            @RequestParam(value = "notes", required = false) String notes,
            @RequestParam(value = "file", required = false) MultipartFile file
    ) throws IOException {

        SharedDetailsDto sharedDetailsDto = new SharedDetailsDto();
        sharedDetailsDto.setNotes(notes);

        storeFileIfPresent(file, sharedDetailsDto);

        SharedDetailsDto createdEntity = service.create(sharedDetailsDto);

        sseService.broadcastToEntity(getEntityPath(),
                new SseEventMessage("CREATE", getEntityPath(), createdEntity));

        return ResponseEntity.ok(createdEntity);
    }

    @PutMapping(value = "/upload/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<SharedDetailsDto> update(
            @PathVariable UUID id,
            @RequestParam(value = "notes", required = false) String notes,
            @RequestParam(value = "file", required = false) MultipartFile file
    ) throws IOException {

        SharedDetailsDto sharedDetailsDto = new SharedDetailsDto();
        sharedDetailsDto.setNotes(notes);

        storeFileIfPresent(file, sharedDetailsDto);

        SharedDetailsDto updatedEntity = service.update(id, sharedDetailsDto);

        sseService.broadcastToEntity(getEntityPath(),
                new SseEventMessage("UPDATE", getEntityPath(), updatedEntity));

        return ResponseEntity.ok(updatedEntity);
    }

    private void storeFileIfPresent(MultipartFile file, SharedDetailsDto dto) throws IOException {
        if (file != null && !file.isEmpty()) {
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            Path filePath = uploadPath.resolve(file.getOriginalFilename());
            file.transferTo(filePath);
            dto.setFileName(file.getOriginalFilename());
        }
    }
}
