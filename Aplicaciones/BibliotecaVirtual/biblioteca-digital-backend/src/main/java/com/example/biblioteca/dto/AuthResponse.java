package com.example.biblioteca.dto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AuthResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String name;
    private String email;
    
    public AuthResponse(String token, Long id, String name, String email) {
        this.token = token;
        this.id = id;
        this.name = name;
        this.email = email;
    }
}