package io.omegi.core.project.application;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.omegi.core.common.exception.AccessDeniedException;
import io.omegi.core.note.domain.Note;
import io.omegi.core.project.domain.Error;
import io.omegi.core.project.domain.Project;
import io.omegi.core.project.persistence.ErrorRepository;
import io.omegi.core.project.presentation.model.response.DrawErrorDetailViewResponse;
import io.omegi.core.user.domain.User;
import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ErrorQueryService {

	private final ErrorRepository errorRepository;

	public DrawErrorDetailViewResponse drawErrorDetailView(Integer userId, Integer errorId) {
		Error error = errorRepository.findById(errorId)
			.orElseThrow(RuntimeException::new);

		io.omegi.core.project.domain.Service service = error.getService();
		Project project = service.getProject();
		User user = project.getUser();

		if (!user.getUserId().equals(userId)) {
			throw new AccessDeniedException(); // todo
		}

		Note note = error.getNote();

		return DrawErrorDetailViewResponse.builder()
			.summary(error.getSummary())
			.log("") // todo
			.noteId(note != null ? note.getNoteId() : -1)
			.build();
	}
}
