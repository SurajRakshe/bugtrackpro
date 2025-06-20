package com.service;

import java.util.List;

import com.dto.ProjectDTO;

public interface ProjectService {

    ProjectDTO createProject(ProjectDTO dto);
    ProjectDTO getProjectById(Long id);
    List<ProjectDTO> getAllProjects();
    ProjectDTO updateProject(Long id, ProjectDTO updatedProject);  
    void deleteProject(Long id);
    
}
