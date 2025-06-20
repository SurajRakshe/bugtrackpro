package com.service;

import java.util.List;

import com.dto.AuthRequest;
import com.dto.UserDTO;
import com.entity.User;

public interface UserService {
	UserDTO getUserById(Long id);

	List<UserDTO> getAllUsers();

	String loginUser(AuthRequest request);

	void registerUser(User user);

	UserDTO getUserByEmail(String email);

	UserDTO convertToDTO(User user);
}
