package com.controller;

import java.util.Collections;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dto.AuthRequest;
import com.dto.UserDTO;
import com.entity.User;
import com.exception.UserNotFoundException;
import com.repository.UserRepository;
import com.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Allow CORS for frontend
@RequiredArgsConstructor
public class AuthController {

	private final UserService userService;
	private final UserRepository userRepository;

	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody User user) {
		try {
			userService.registerUser(user);
			return ResponseEntity.ok("User registered successfully.");
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(Collections.singletonMap("message", e.getMessage()));
		}
	}

	@PostMapping("/login")
	public ResponseEntity<Map<String, String>> login(@RequestBody AuthRequest request) {
		String token = userService.loginUser(request);
		return ResponseEntity.ok(Collections.singletonMap("token", token));
	}

	@GetMapping("/me")
	@PreAuthorize("hasAnyRole('USER','ADMIN')")
	public ResponseEntity<UserDTO> getCurrentUser(Authentication authentication) {
		String email = authentication.getName();
		User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User not found"));
		UserDTO dto = userService.convertToDTO(user);
		return ResponseEntity.ok(dto);
	}
}