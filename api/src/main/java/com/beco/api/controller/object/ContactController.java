package com.beco.api.controller.object;

import com.beco.api.config.sse.SseService;
import com.beco.api.controller.AbstractCrudController;
import com.beco.api.model.dto.ContactDto;
import com.beco.api.model.entity.Contact;
import com.beco.api.service.AbstractCrudService;
import com.beco.api.service.object.ContactService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/contacts")
@CrossOrigin(origins = "http://localhost:4200")
public class ContactController extends AbstractCrudController<Contact, ContactDto, ContactDto, Integer> {

    private final ContactService contactService;

    public ContactController(
            ContactService contactService,
            SseService sseService
    ) {
        super(sseService);
        this.contactService = contactService;
    }
    @Override
    protected AbstractCrudService<Contact, ContactDto, ContactDto, Integer> getService() {

        return contactService;
    }

    @GetMapping("byemail")
    public ContactDto getContactByEmail(@RequestParam String email) {
        return contactService.findByEmail(email);
    }

}