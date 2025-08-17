package com.cobe.api.service;

import com.cobe.api.model.entity.DBUser;
import com.cobe.api.repository.DBUserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class RegisterService {

    private final DBUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public RegisterService(DBUserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public ResponseEntity<Map<String, String>> registerUser(DBUser user) {
        validateUsernameAvailability(user.getUsername());
        encodeUserPassword(user);
        assignDefaultPermissionIfNeeded(user);
        saveUser(user);

        return createSuccessResponse("Inscription réussie");
    }

    private void validateUsernameAvailability(String username) {
        if (isUsernameAlreadyTaken(username)) {
            throw new IllegalStateException("Utilisateur déjà existant");
        }
    }

    private void encodeUserPassword(DBUser user) {
        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
    }

    private void assignDefaultPermissionIfNeeded(DBUser user) {
        if (user.getPermission() == null || user.getPermission().isEmpty()) {
            user.setPermission("USER");
        }
    }

    private void saveUser(DBUser user) {
        userRepository.save(user);
    }

    private ResponseEntity<Map<String, String>> createSuccessResponse(String message) {
        Map<String, String> response = new HashMap<>();
        response.put("message", message);
        return ResponseEntity.ok(response);
    }

    private boolean isUsernameAlreadyTaken(String username) {
        return userRepository.findByUsername(username) != null;
    }
}