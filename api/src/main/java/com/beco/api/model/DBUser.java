package com.beco.api.model;

import com.beco.api.model.entity.Contact;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Entity
@Table(name = "dbuser")
public class DBUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer userId;

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
    @JoinColumn(name = "contact_id", referencedColumnName = "contact_id")
    private Contact contact;

    @Column(name = "permission", nullable = true)
    private String permission;
}