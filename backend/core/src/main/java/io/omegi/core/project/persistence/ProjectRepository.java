package io.omegi.core.project.persistence;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import io.omegi.core.project.domain.Project;

public interface ProjectRepository extends JpaRepository<Project, Integer> {

	Optional<Project> findByName(String name);
}
