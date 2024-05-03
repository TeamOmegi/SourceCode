package io.omegi.core.note.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import io.omegi.core.note.domain.Note;
import io.omegi.core.user.domain.User;

public interface NoteRepository extends JpaRepository<Note, Integer> {

	boolean existsByNoteIdAndUser(Integer noteId, User user);
}
