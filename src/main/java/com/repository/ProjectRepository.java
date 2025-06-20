package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entity.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}
