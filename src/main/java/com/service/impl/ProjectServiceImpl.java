package com.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.dto.ProjectDTO;
import com.dto.UserDTO;
import com.entity.Project;
import com.repository.ProjectRepository;
import com.service.ProjectService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

	private final ProjectRepository projectRepository;

    private ProjectDTO convertToDTO(Project project) {
        ProjectDTO dto = new ProjectDTO();
        dto.setId(project.getId());
        dto.setTitle(project.getTitle()); 
        dto.setDescription(project.getDescription());
        dto.setMembers(project.getMembers().stream().map(member -> {
            UserDTO userDTO = new UserDTO();
            userDTO.setId(member.getId());
            userDTO.setEmail(member.getEmail());
            userDTO.setName(member.getName());
            userDTO.setRole(member.getRole());
            return userDTO;
        }).collect(Collectors.toList()));
        return dto;
    }

    @Override
    public ProjectDTO createProject(ProjectDTO dto) {
        Project project = new Project();
        project.setTitle(dto.getTitle()); 
        project.setDescription(dto.getDescription());
        return convertToDTO(projectRepository.save(project));
    }

    @Override
    public List<ProjectDTO> getAllProjects() {
        return projectRepository.findAll().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    @Override
    public ProjectDTO getProjectById(Long id) {
        return projectRepository.findById(id)
            .map(this::convertToDTO)
            .orElseThrow(() -> new RuntimeException("Project not found"));
    }

    @Override
    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }

    @Override
    public ProjectDTO updateProject(Long id, ProjectDTO updatedProject) {
        Project existingProject = projectRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));

        existingProject.setTitle(updatedProject.getTitle());
        existingProject.setDescription(updatedProject.getDescription());

        return convertToDTO(projectRepository.save(existingProject));
    }
}
