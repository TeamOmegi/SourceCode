package io.omegi.core.note.application.dto.request;

import java.util.List;

public record SaveNoteRequestDto(
	String title,
	String content,
	List<String> tagNames,
	String type,
	String visibility,
	List<Integer> targetNoteIds
) {
}
