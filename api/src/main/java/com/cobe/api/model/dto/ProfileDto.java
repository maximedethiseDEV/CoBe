package com.cobe.api.model.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class ProfileDto {
    private UUID id;
    private String username;
    private String lastName;
    private String firstName;
    private String email;
    private String phone;
    private String role;
    private String permission;
}