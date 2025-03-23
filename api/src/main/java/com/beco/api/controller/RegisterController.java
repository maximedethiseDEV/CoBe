package com.beco.api.controller;

import com.beco.api.model.DBUser;
import com.beco.api.repository.DBUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RegisterController {

    @Autowired
    private DBUserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public String registerUser(@RequestBody DBUser user) {
        // Vérifier si l'utilisateur existe déjà
        if (userRepository.findByUsername(user.getUsername()) != null) {
            return "Utilisateur déjà existant";
        }

        // Encoder le mot de passe
        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));

        // Définir un rôle par défaut (par exemple, "USER")
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("USER");
        }

        // Sauvegarder l'utilisateur dans la base de données
        userRepository.save(user);

        return "Utilisateur enregistré avec succès";
    }
}
