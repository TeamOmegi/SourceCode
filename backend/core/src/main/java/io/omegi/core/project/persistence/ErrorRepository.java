package io.omegi.core.project.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import io.omegi.core.project.domain.Error;

public interface ErrorRepository extends JpaRepository<Error, Integer> {
}
