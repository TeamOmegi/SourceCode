package io.omegi.core.project.application;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import io.omegi.core.common.presentation.sse.SseEmitterManager;
import io.omegi.core.note.domain.Note;
import io.omegi.core.project.application.dto.request.SendErrorsRequestDto;
import io.omegi.core.project.application.dto.request.SubscribeErrorsRequestDto;
import io.omegi.core.project.application.dto.request.UnsubscribeErrorsRequestDto;
import io.omegi.core.project.domain.Error;
import io.omegi.core.project.domain.Project;
import io.omegi.core.project.persistence.ErrorRepository;
import io.omegi.core.project.presentation.model.response.sse.RealTimeErrorResponse;
import io.omegi.core.user.domain.User;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class RealTimeErrorQueryService {

	private final SseEmitterManager sseEmitterManager;
	private final ErrorRepository errorRepository;

	public SseEmitter subscribeErrors(SubscribeErrorsRequestDto requestDto) {
		return sseEmitterManager.create(requestDto.userId());
	}

	public void unsubscribeErrors(UnsubscribeErrorsRequestDto requestDto) {
		sseEmitterManager.complete(requestDto.userId());
	}

	public void sendErrors(SendErrorsRequestDto requestDto) {
		Error error = errorRepository.findById(requestDto.errorId())
			.orElseThrow(RuntimeException::new);

		Note note = error.getNote();
		io.omegi.core.project.domain.Service service = error.getService();
		Project project = service.getProject();
		User user = project.getUser();

		RealTimeErrorResponse errorResponse = RealTimeErrorResponse.builder()
			.errorId(error.getErrorId())
			.userId(user.getUserId())
			.noteId(note == null ? -1 : note.getNoteId())
			.serviceId(service.getServiceId())
			.projectId(project.getProjectId())
			.type(error.getType())
			.summary(error.getSummary())
			.time(error.getTime())
			.build();

		sseEmitterManager.sendEvent(user.getUserId(), error.getErrorId().toString(), error.getType(), errorResponse);
	}
}
