package com.dto;

import java.util.List;

import lombok.Data;

@Data
public class ProjectDTO {

	private Long id;
	private String title;
	private String description;
	private List<UserDTO> members;

}
