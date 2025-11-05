
package com.example.biblioteca.controller;

import com.example.biblioteca.dto.FavoriteRequest;
import com.example.biblioteca.dto.FavoriteResponse;
import com.example.biblioteca.dto.MessageResponse;
import com.example.biblioteca.model.Favorite;
import com.example.biblioteca.model.User;
import com.example.biblioteca.repository.FavoriteRepository;
import com.example.biblioteca.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/favorites")
@CrossOrigin(origins = "*")
public class FavoriteController {
    
    @Autowired
    private FavoriteRepository favoriteRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @GetMapping
    public ResponseEntity<List<FavoriteResponse>> getUserFavorites(Authentication authentication) {
        User user = getUserFromAuth(authentication);
        
        List<FavoriteResponse> favorites = favoriteRepository.findByUserId(user.getId())
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(favorites);
    }
    
    @PostMapping
    public ResponseEntity<?> addFavorite(@Valid @RequestBody FavoriteRequest request, 
                                         Authentication authentication) {
        User user = getUserFromAuth(authentication);
        
        if (favoriteRepository.findByUserIdAndBookId(user.getId(), request.getBookId()).isPresent()) {
            return ResponseEntity.badRequest().body(new MessageResponse("El libro ya está en favoritos"));
        }
        
        Favorite favorite = new Favorite();
        favorite.setUser(user);
        favorite.setBookId(request.getBookId());
        favorite.setTitle(request.getTitle());
        favorite.setAuthors(request.getAuthors());
        favorite.setThumbnail(request.getThumbnail());
        favorite.setDescription(request.getDescription());
        
        favoriteRepository.save(favorite);
        
        return ResponseEntity.ok(convertToResponse(favorite));
    }
    
    @DeleteMapping("/{bookId}")
    @Transactional
    public ResponseEntity<?> removeFavorite(@PathVariable String bookId, Authentication authentication) {
        User user = getUserFromAuth(authentication);
        
        favoriteRepository.deleteByUserIdAndBookId(user.getId(), bookId);
        
        return ResponseEntity.ok(new MessageResponse("Libro eliminado de favoritos"));
    }
    
    private User getUserFromAuth(Authentication authentication) {
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }
    
    private FavoriteResponse convertToResponse(Favorite favorite) {
        FavoriteResponse response = new FavoriteResponse();
        response.setId(favorite.getId());
        response.setBookId(favorite.getBookId());
        response.setTitle(favorite.getTitle());
        response.setAuthors(favorite.getAuthors());
        response.setThumbnail(favorite.getThumbnail());
        response.setDescription(favorite.getDescription());
        response.setCreatedAt(favorite.getCreatedAt().toString());
        return response;
    }
}