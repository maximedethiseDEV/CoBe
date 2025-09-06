package com.cobe.api.controller;

import com.cobe.api.model.dto.PostProfileDto;
import com.cobe.api.model.dto.ProfileDto;
import org.springframework.http.ResponseEntity;
import com.cobe.api.service.ProfileService;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/me")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping
    public ResponseEntity<ProfileDto> getCurrentUserProfile() {
        return ResponseEntity.ok(profileService.getCurrentUserProfile());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProfileDto> updateCurrentUserProfile(@PathVariable("id") UUID id,
                                                               @RequestBody PostProfileDto dto) {
        return ResponseEntity.ok(profileService.updateCurrentUserProfile(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCurrentUser(@PathVariable("id") UUID id) {
        profileService.deleteCurrentUser(id);
        return ResponseEntity.noContent().build();
    }
}