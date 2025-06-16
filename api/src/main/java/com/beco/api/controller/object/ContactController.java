package com.beco.api.controller.object;

import com.beco.api.config.sse.SseService;
import com.beco.api.controller.AbstractCrudController;
import com.beco.api.model.dto.ContactDto;
import com.beco.api.model.entity.Contact;
import com.beco.api.service.AbstractCrudService;
import com.beco.api.service.object.ContactService;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/contacts")
@CrossOrigin(origins = "http://localhost:4200")
public class ContactController extends AbstractCrudController<Contact, ContactDto, ContactDto, UUID> {

    private final ContactService service;

    public ContactController(
            ContactService service,
            SseService sseService
    ) {
        super(sseService);
        this.service = service;
    }
    @Override
    protected AbstractCrudService<Contact, ContactDto, ContactDto, UUID> getService() {

        return service;
    }

    @GetMapping("byemail")
    public ContactDto getContactByEmail(@RequestParam String email) {
        return service.findByEmail(email);
    }

}