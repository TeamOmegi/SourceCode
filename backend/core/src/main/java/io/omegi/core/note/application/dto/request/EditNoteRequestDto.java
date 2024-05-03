package io.omegi.core.note.application.dto.request;

import java.util.List;

public record EditNoteRequestDto(
	Integer noteId,
	String title,
	String content,
	List<String> tagNames,
	String noteType,
	String noteVisibility,
	List<Integer> linkedNoteIds
) {
}
