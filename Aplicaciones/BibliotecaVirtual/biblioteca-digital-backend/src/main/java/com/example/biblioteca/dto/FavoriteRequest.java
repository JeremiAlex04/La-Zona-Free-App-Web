package com.example.biblioteca.dto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class FavoriteRequest {
    @NotBlank(message = "El ID del libro es requerido")
    private String bookId;
    
    @NotBlank(message = "El título es requerido")
    private String title;
    
    private String authors;
    private String thumbnail;
    private String description;
}