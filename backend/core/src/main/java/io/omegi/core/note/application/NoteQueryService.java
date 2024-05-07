package io.omegi.core.note.application;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.omegi.core.common.exception.AccessDeniedException;
import io.omegi.core.note.application.exception.NoteNotFoundException;
import io.omegi.core.note.domain.Note;
import io.omegi.core.note.domain.NoteTag;
import io.omegi.core.note.domain.Tag;
import io.omegi.core.note.persistence.LinkRepository;
import io.omegi.core.note.persistence.NoteRepository;
import io.omegi.core.note.presentation.model.response.DrawAllNoteDetailViewResponse;
import io.omegi.core.note.presentation.model.response.DrawAllNoteListViewResponse;
import io.omegi.core.note.presentation.model.response.DrawMyNoteDetailViewResponse;
import io.omegi.core.note.presentation.model.response.DrawMyNoteListViewResponse;
import io.omegi.core.project.domain.Error;
import io.omegi.core.project.presentation.model.response.DrawNoteSummaryViewResponse;
import io.omegi.core.user.domain.User;
import io.omegi.core.user.persistence.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class NoteQueryService {

	private final NoteRepository noteRepository;
	private final UserRepository userRepository;
	private final LinkRepository linkRepository;

	public DrawMyNoteDetailViewResponse drawMyNoteDetailView(Integer userId, Integer noteId) {
		Note note = noteRepository.findById(noteId)
			.orElseThrow(NoteNotFoundException::new);

		User user = note.getUser();
		if (!user.getUserId().equals(userId)) {
			throw new AccessDeniedException();
		}

		List<String> tagNames = note.getNoteTags().stream()
			.map(NoteTag::getTag)
			.map(Tag::getName)
			.toList();

		Error error = note.getError();
		DrawMyNoteDetailViewResponse.RelatedErrorResponse relatedErrorResponse = null;
		if (error != null) {
			relatedErrorResponse = DrawMyNoteDetailViewResponse.RelatedErrorResponse.builder()
				.errorId(error.getErrorId())
				.errorType(error.getType())
				.summary(error.getSummary())
				.solved(error.isSolved())
				.build();
		}

		return DrawMyNoteDetailViewResponse.builder()
			.noteId(note.getNoteId())
			.title(note.getTitle())
			.content(note.getContent())
			.tags(tagNames)
			.type(note.getNoteType().getType().name())
			.visibility(note.getNoteVisibility().getVisibility().name())
			.backlinkCount(note.getBacklinkCount())
			.createdAt(note.getCreatedAt())
			.error(relatedErrorResponse)
			.build();
	}

	public DrawMyNoteListViewResponse drawMyNoteListView(Integer userId, String keyword, String tagName) {
		User user = userRepository.findById(userId)
			.orElseThrow(RuntimeException::new);

		List<Note> notes = noteRepository.searchMyNotes(user, keyword, tagName);

		List<DrawMyNoteListViewResponse.NoteResponse> noteResponses = notes.stream()
			.map(note -> {
				List<String> tagNames = note.getNoteTags().stream()
					.map(noteTag -> noteTag.getTag().getName())
					.toList();

				return DrawMyNoteListViewResponse.NoteResponse.builder()
					.noteId(note.getNoteId())
					.title(note.getTitle())
					.content(note.getContent())
					.tags(tagNames)
					.type(note.getNoteType().getType().name())
					.visibility(note.getNoteVisibility().getVisibility().name())
					.backlinkCount(note.getBacklinkCount())
					.createdAt(note.getCreatedAt())
					.errorId(note.getError() == null ? -1 : note.getError().getErrorId())
					.build();
			})
			.toList();

		return new DrawMyNoteListViewResponse(noteResponses);
	}

	public DrawAllNoteDetailViewResponse drawAllNoteDetailView(Integer noteId) {
		Note note = noteRepository.findById(noteId)
			.orElseThrow(NoteNotFoundException::new);

		if (!note.isPublic()) {
			throw new AccessDeniedException();
		}

		List<String> tagNames = note.getNoteTags().stream()
			.map(NoteTag::getTag)
			.map(Tag::getName)
			.toList();

		Error error = note.getError();
		DrawAllNoteDetailViewResponse.RelatedErrorResponse relatedErrorResponse = null;
		if (error != null) {
			relatedErrorResponse = DrawAllNoteDetailViewResponse.RelatedErrorResponse.builder()
				.errorId(error.getErrorId())
				.errorType(error.getType())
				.summary(error.getSummary())
				.solved(error.isSolved())
				.build();
		}

		return DrawAllNoteDetailViewResponse.builder()
			.noteId(note.getNoteId())
			.title(note.getTitle())
			.content(note.getContent())
			.tags(tagNames)
			.type(note.getNoteType().getType().name())
			.visibility(note.getNoteVisibility().getVisibility().name())
			.backlinkCount(note.getBacklinkCount())
			.createdAt(note.getCreatedAt())
			.error(relatedErrorResponse)
			.build();
	}

	public DrawAllNoteListViewResponse drawAllNoteListView(Integer userId, String keyword) {
		List<Note> notes = noteRepository.searchAllNotes(keyword);

		List<DrawAllNoteListViewResponse.NoteResponse> noteResponses = notes.stream()
			.map(note -> {
				User user = note.getUser();

				DrawAllNoteListViewResponse.UserResponse userResponse = DrawAllNoteListViewResponse.UserResponse.builder()
					.userId(user.getUserId())
					.username(user.getUsername())
					.profileImageUrl(user.getProfileImageUrl())
					.build();

				return DrawAllNoteListViewResponse.NoteResponse.builder()
					.noteId(note.getNoteId())
					.title(note.getTitle())
					.content(note.getContent())
					.createdAt(note.getCreatedAt())
					.isMine(user.getUserId().equals(userId))
					.user(userResponse)
					.build();
			})
			.toList();

		return new DrawAllNoteListViewResponse(noteResponses);
	}

	public DrawNoteSummaryViewResponse drawNoteSummaryView(Integer userId) {
		User user = userRepository.findById(userId)
			.orElseThrow(RuntimeException::new);

		int noteCount = noteRepository.countByUser(user);
		int linkCount = linkRepository.countByUserToOthers(user);
		int backlinkCount = linkRepository.countByOthersToUser(user);

		return new DrawNoteSummaryViewResponse(noteCount, linkCount, backlinkCount);
	}
}
