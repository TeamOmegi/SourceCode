package io.omegi.core.note.application.dto.request;

public record NoteDetailRequestDto(
	Integer userId,
	Integer noteId
) {
}
