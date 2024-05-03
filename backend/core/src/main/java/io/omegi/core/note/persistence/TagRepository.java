package io.omegi.core.note.persistence;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import io.omegi.core.note.domain.Tag;

public interface TagRepository extends JpaRepository<Tag, Integer> {

	Optional<Tag> findByName(String name);

	boolean existsByName(String name);
}
