package com.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.dto.AuthRequest;
import com.dto.UserDTO;
import com.entity.User;
import com.exception.InvalidCredentialsException;
import com.exception.UserAlreadyExistsException;
import com.exception.UserNotFoundException;
import com.repository.UserRepository;
import com.security.JwtUtil;
import com.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtUtil jwtUtil;

	public UserDTO convertToDTO(User user) {
		UserDTO dto = new UserDTO();
		dto.setId(user.getId());
		dto.setEmail(user.getEmail());
		dto.setName(user.getName());
		dto.setRole(user.getRole());
		return dto;
	}

	@Override
	public UserDTO getUserById(Long id) {
		return userRepository.findById(id)
				.map(this::convertToDTO)
				.orElseThrow(() -> new UserNotFoundException("User not found with ID: " + id));
	}

	@Override
	public List<UserDTO> getAllUsers() {
		return userRepository.findAll()
				.stream()
				.map(this::convertToDTO)
				.collect(Collectors.toList());
	}

	@Override
	public void registerUser(User user) {
		if (userRepository.findByEmail(user.getEmail()).isPresent()) {
			throw new UserAlreadyExistsException("User already exists with email: " + user.getEmail());
		}
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		userRepository.save(user);
	}

	@Override
	public String loginUser(AuthRequest request) {
		User user = userRepository.findByEmail(request.getEmail())
				.orElseThrow(() -> new UserNotFoundException("User not found with email: " + request.getEmail()));

		System.out.println("💡 User found: " + user.getEmail());
		System.out.println("🔑 Raw password: " + request.getPassword());
		System.out.println("🔐 Encoded password from DB: " + user.getPassword());

		boolean match = passwordEncoder.matches(request.getPassword(), user.getPassword());
		System.out.println("✅ Password matches: " + match);

		if (!match) {
			throw new InvalidCredentialsException("Invalid password");
		}

		return jwtUtil.generateToken(user);
	}

	@Override
	public UserDTO getUserByEmail(String email) {
		User user = userRepository.findByEmail(email)
				.orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));
		return convertToDTO(user);
	}
}