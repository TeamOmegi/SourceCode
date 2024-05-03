package io.omegi.core.note.application.dto.request;

import java.util.List;

public record LinkNotesRequestDto(
	Integer noteId,
	List<Integer> targetNoteIds
) {
}
