package io.omegi.core.note.application;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.omegi.core.note.application.dto.request.NoteDetailRequestDto;
import io.omegi.core.note.application.dto.response.NoteDetailResponseDto;
import io.omegi.core.note.application.exception.NoteNotFoundException;
import io.omegi.core.note.domain.Note;
import io.omegi.core.note.domain.NoteTag;
import io.omegi.core.note.domain.Tag;
import io.omegi.core.note.persistence.NoteRepository;
import io.omegi.core.project.domain.Error;
import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class NoteQueryService {

	private final NoteRepository noteRepository;

	public NoteDetailResponseDto queryNote(NoteDetailRequestDto requestDto) {
		Note note = noteRepository.findById(requestDto.noteId())
			.orElseThrow(NoteNotFoundException::new);

		List<String> tagNames = note.getNoteTags().stream()
			.map(NoteTag::getTag)
			.map(Tag::getName)
			.toList();

		Error error = note.getError();
		NoteDetailResponseDto.RelatedErrorResponseDto relatedError = NoteDetailResponseDto.RelatedErrorResponseDto.builder()
			.errorId(error.getErrorId())
			.errorType(error.getType())
			.summary(error.getSummary())
			.solved(error.isSolved())
			.build();

		return NoteDetailResponseDto.builder()
			.noteId(note.getNoteId())
			.title(note.getTitle())
			.content(note.getContent())
			.tagNames(tagNames)
			.noteType(note.getType().name())
			.noteVisibility(note.getVisibility().name())
			.backlinkCount(note.getBacklinkCount())
			.createdAt(note.getCreatedAt())
			.relatedError(relatedError)
			.build();
	}
}
