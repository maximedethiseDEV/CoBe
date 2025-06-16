package com.beco.api.controller;

import com.beco.api.model.entity.DBUser;
import com.beco.api.service.RegisterService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/register")
@CrossOrigin(origins = "http://localhost:4200")
public class RegisterController {

    private final RegisterService registerService;

    public RegisterController(RegisterService registerService) {
        this.registerService = registerService;
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> registerUser(@Valid @RequestBody DBUser user) {
        return registerService.registerUser(user);
    }
}