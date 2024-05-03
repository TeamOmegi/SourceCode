package io.omegi.core.note.application.dto.request;

import java.util.List;

public record UnlinkNotesRequestDto(
	Integer noteId,
	List<Integer> linkedNoteIds
) {
}
