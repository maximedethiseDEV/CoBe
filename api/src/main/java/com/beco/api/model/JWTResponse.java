package com.beco.api.model;

import lombok.Data;

@Data
public class JWTResponse {
    private String token;
    private String roles;

    public JWTResponse(String token, String roles) {
        this.token = token;
        this.roles = roles;
    }
}
