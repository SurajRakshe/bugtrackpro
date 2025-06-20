package com.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dto.ProjectDTO;
import com.service.ProjectService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {
	

	 private final ProjectService projectService;

	    @PreAuthorize("hasRole('ADMIN')")
	    @PostMapping
	    public ResponseEntity<ProjectDTO> createProject(@RequestBody ProjectDTO projectDTO) {
	        return ResponseEntity.ok(projectService.createProject(projectDTO));
	    }

	    @GetMapping
	    public ResponseEntity<List<ProjectDTO>> getAllProjects() {
	        return ResponseEntity.ok(projectService.getAllProjects());
	    }

	    @GetMapping("/{id}")
	    public ResponseEntity<ProjectDTO> getProjectById(@PathVariable Long id) {
	        return ResponseEntity.ok(projectService.getProjectById(id));
	    }

	    @PutMapping("/{id}")
	    public ResponseEntity<ProjectDTO> updateProject(@PathVariable Long id, @RequestBody ProjectDTO updatedProject) {
	        return ResponseEntity.ok(projectService.updateProject(id, updatedProject));
	    }

	    @DeleteMapping("/{id}")
	    public ResponseEntity<String> deleteProject(@PathVariable Long id) {
	        projectService.deleteProject(id);
	        return ResponseEntity.ok("Project deleted");
	    }
	}