package com.beco.api.controller;

import com.beco.api.dto.ContactDto;
import com.beco.api.model.Contact;
import com.beco.api.service.dto.ContactDtoService;
import com.beco.api.service.CrudService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/contacts")
@CrossOrigin(origins = "http://localhost:4200")
public class ContactController extends AbstractCrudController<ContactDto, Integer> {

    private final ContactDtoService contactDtoService;

    public ContactController(ContactDtoService contactDtoService) {
        this.contactDtoService = contactDtoService;
    }

    @Override
    protected CrudService<ContactDto, Integer> getService() {
        return contactDtoService;
    }

    @GetMapping("byemail")
    public ContactDto getContactByEmail(@RequestParam String email) {
        return contactDtoService.findByEmail(email);
    }

}