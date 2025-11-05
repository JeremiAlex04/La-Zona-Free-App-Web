package com.example.biblioteca.dto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;


@Data
public class MessageResponse {
    private String message;
    
    public MessageResponse(String message) {
        this.message = message;
    }
}