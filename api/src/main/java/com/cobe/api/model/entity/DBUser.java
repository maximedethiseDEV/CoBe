package com.cobe.api.model.entity;

import com.cobe.api.config.security.UserRole;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Entity
@Table(name = "dbuser")
public class DBUser  extends AbstractEntity {

    @NotBlank(message = "Le nom d'utilisateur est requis.")
    @Size(min = 3, message = "Le nom d'utilisateur doit contenir au moins 3 caractères.")
    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @NotBlank(message = "Le mot de passe est requis.")
    @Size(min = 6, message = "Le mot de passe doit contenir au moins 6 caractères.")
    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @NotNull(message = "Le contact est requis.")
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "contact_id")
    private Contact contact;

    @Enumerated(EnumType.STRING)
    @Column(name = "permission", nullable = false)
    private UserRole permission;
}