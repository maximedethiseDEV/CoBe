package com.beco.api.controller;

import com.beco.api.model.Contact;
import com.beco.api.service.dto.ContactDtoService;
import com.beco.api.service.CrudService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/contacts")
@CrossOrigin(origins = "http://localhost:4200")
public class ContactController extends AbstractCrudController<Contact, Integer> {

    private final ContactDtoService contactDtoService;

    public ContactController(ContactDtoService contactDtoService) {
        this.contactDtoService = contactDtoService;
    }

    @Override
    protected CrudService<Contact, Integer> getService() {
        return contactDtoService;
    }

    @GetMapping("byemail")
    public Contact getContactByEmail(@RequestParam String email) {
        return contactDtoService.findByEmail(email);
    }

}