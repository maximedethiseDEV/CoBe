package com.beco.api.controller;

import com.beco.api.model.DBUser;
import com.beco.api.repository.DBUserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/register")
@CrossOrigin(origins = "http://localhost:4200")
public class RegisterController {

    @Autowired
    private DBUserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping
    public ResponseEntity<Map<String, String>> registerUser(@Valid @RequestBody DBUser user) {
        Map<String, String> response = new HashMap<>();

        if (userRepository.findByUsername(user.getUsername()) != null) {
            response.put("message", "Utilisateur déjà existant");
            return ResponseEntity.status(409).body(response); // 409 Conflict
        }

        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));

        if (user.getPermission() == null || user.getPermission().isEmpty()) {
            user.setPermission("USER");
        }

        userRepository.save(user);

        response.put("message", "Utilisateur enregistré avec succès");
        return ResponseEntity.ok(response); // 200 OK
    }
}
