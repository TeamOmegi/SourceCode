package io.omegi.core.note.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import io.omegi.core.note.domain.Link;
import io.omegi.core.note.domain.Note;

public interface LinkRepository extends JpaRepository<Link, Integer> {

	void deleteByLinkedNote(Note linkedNote);
}
