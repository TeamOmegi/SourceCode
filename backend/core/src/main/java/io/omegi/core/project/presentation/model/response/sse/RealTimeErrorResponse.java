package io.omegi.core.project.presentation.model.response.sse;

import java.time.LocalDateTime;

import lombok.Builder;

@Builder
public record RealTimeErrorResponse(
	Integer errorId,
	Integer userId,
	Integer noteId,
	Integer serviceId,
	Integer projectId,
	String type,
	String summary,
	LocalDateTime time
) {
}
