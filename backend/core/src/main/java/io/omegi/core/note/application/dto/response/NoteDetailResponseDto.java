package io.omegi.core.note.application.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Builder;

@Builder
public record NoteDetailResponseDto(
	Integer noteId,
	String title,
	String content,
	List<String> tagNames,
	String noteType,
	String noteVisibility,
	Integer backlinkCount,
	LocalDateTime createdAt,
	RelatedErrorResponseDto relatedError
) {
	@Builder
	public record RelatedErrorResponseDto(
		Integer errorId,
		String errorType,
		String summary,
		boolean solved
	) {
	}
}
