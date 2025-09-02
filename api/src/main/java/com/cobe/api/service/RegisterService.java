package com.cobe.api.service;

import com.cobe.api.config.security.UserRole;
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
    private static final String DEFAULT_ROLE = UserRole.USER.toString();

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

    private void assignDefaultPermissionIfNeeded(DBUser user) {
        if (user.getPermission() == null) {
            user.setPermission(UserRole.valueOf(DEFAULT_ROLE));
        }
    }

    public ResponseEntity<Map<String, String>> updateUserRole(String username, UserRole newRole) {
        DBUser user = userRepository.findByUsername(username);
        if (user == null) {
            throw new IllegalStateException("Utilisateur introuvable");
        }
        user.setPermission(newRole);
        userRepository.save(user);
        return createSuccessResponse("Rôle mis à jour: " + newRole.name());
    }

}