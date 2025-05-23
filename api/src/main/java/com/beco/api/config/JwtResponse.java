package com.beco.api.config;

import lombok.Data;

@Data
public class JwtResponse {
    private String token;
    private String roles;

    public JwtResponse(String token, String roles) {
        this.token = token;
        this.roles = roles;
    }
}
