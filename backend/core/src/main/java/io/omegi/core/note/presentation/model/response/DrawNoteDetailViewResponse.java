package io.omegi.core.note.presentation.model.response;

import java.time.LocalDateTime;
import java.util.List;

public record DrawNoteDetailViewResponse(
	Integer noteId,
	String title,
	String content,
	List<String> tags,
	String type,
	String visibility,
	Integer backlinkCount,
	LocalDateTime createdAt,
	RelatedErrorResponse error
) {
	private record RelatedErrorResponse(
		Integer errorId,
		String errorType,
		String summary,
		boolean solved
		) {
	}
}