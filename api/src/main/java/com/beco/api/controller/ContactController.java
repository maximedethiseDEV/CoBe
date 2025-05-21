package com.beco.api.controller;

import com.beco.api.model.Contact;
import com.beco.api.service.ContactService;
import com.beco.api.service.CrudService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/contact")
@CrossOrigin(origins = "http://localhost:4200")
public class ContactController extends AbstractCrudController<Contact, Integer> {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @Override
    protected CrudService<Contact, Integer> getService() {
        return contactService;
    }

}
