package com.cobe.api.service;

import com.cobe.api.mapper.ProfileMapper;
import com.cobe.api.model.dto.PostProfileDto;
import com.cobe.api.model.dto.ProfileDto;
import com.cobe.api.model.entity.DBUser;
import com.cobe.api.repository.DBUserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProfileService {

    private final DBUserRepository dbUserRepository;
    private final ProfileMapper profileMapper;

    public ProfileService(DBUserRepository dbUserRepository, ProfileMapper profileMapper) {
        this.dbUserRepository = dbUserRepository;
        this.profileMapper = profileMapper;
    }

    public ProfileDto getCurrentUserProfile() {
        DBUser user = getCurrentUserEntity();
        ProfileDto dto = profileMapper.toDto(user);
        dto.setRole(resolveRoleFromSecurityContext());
        dto.setPermission(resolvePermissionsFromSecurityContext());
        return dto;
    }

    public ProfileDto updateCurrentUserProfile(UUID id, PostProfileDto dto) {
        DBUser user = getCurrentUserEntity();
        if (!user.getId().equals(id)) {
            throw new IllegalArgumentException("L'identifiant ne correspond pas à l'utilisateur connecté.");
        }
        profileMapper.updateFromDto(dto, user);
        DBUser saved = dbUserRepository.save(user);
        ProfileDto result = profileMapper.toDto(saved);
        result.setRole(resolveRoleFromSecurityContext());
        result.setPermission(resolvePermissionsFromSecurityContext());
        return result;
    }

    public void deleteCurrentUser(UUID id) {
        DBUser user = getCurrentUserEntity();
        if (!user.getId().equals(id)) {
            throw new IllegalArgumentException("L'identifiant ne correspond pas à l'utilisateur connecté.");
        }
        dbUserRepository.deleteById(user.getId());
    }

    private DBUser getCurrentUserEntity() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        DBUser user = dbUserRepository.findByUsername(username);
        if (user == null) {
            throw new IllegalStateException("Utilisateur courant introuvable: " + username);
        }
        return user;
    }

    private String resolveRoleFromSecurityContext() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) return null;
        return authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .filter(a -> a != null && a.startsWith("ROLE_"))
                .map(a -> a.substring("ROLE_".length())) // ROLE_ADMIN -> ADMIN
                .findFirst()
                .orElse(null);
    }

    private String resolvePermissionsFromSecurityContext() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) return null;
        // Concatène toutes les autorités non ROLE_ (ou tout si tu veux tout renvoyer)
        return authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .filter(a -> a != null)
                .collect(Collectors.joining(" "));
    }
}
