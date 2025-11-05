package com.example.biblioteca.dto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class FavoriteResponse {
    private Long id;
    private String bookId;
    private String title;
    private String authors;
    private String thumbnail;
    private String description;
    private String createdAt;
}