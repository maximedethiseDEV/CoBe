package com.cobe.api.model.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class PostProfileDto {
    private UUID id;
    private String username;
    private String lastName;
    private String firstName;
    private String email;
    private String phone;
}