package io.omegi.core.note.application;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.omegi.core.note.application.dto.request.DeleteNoteRequestDto;
import io.omegi.core.note.application.dto.request.EditNoteRequestDto;
import io.omegi.core.note.application.dto.request.SaveNoteRequestDto;
import io.omegi.core.note.application.event.NoteSavedEvent;
import io.omegi.core.note.application.exception.NoteAccessDeniedException;
import io.omegi.core.note.application.exception.NoteNotFoundException;
import io.omegi.core.note.domain.Note;
import io.omegi.core.note.domain.NoteType;
import io.omegi.core.note.domain.NoteVisibility;
import io.omegi.core.note.persistence.NoteRepository;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class NoteCommandService {

	private final NoteRepository noteRepository;

	private final ApplicationEventPublisher eventPublisher;

	public void saveNote(SaveNoteRequestDto requestDto) {
		Note note = Note.builder()
			.title(requestDto.title())
			.content(requestDto.content())
			.type(NoteType.valueOf(requestDto.type()))
			.visibility(NoteVisibility.valueOf(requestDto.visibility()))
			.build();

		noteRepository.save(note);

		eventPublisher.publishEvent(new NoteSavedEvent(note.getNoteId(), requestDto.tagNames(), requestDto.targetNoteIds()));
	}

	public void editNote(EditNoteRequestDto requestDto) {
		Note note = noteRepository.findById(requestDto.noteId())
			.orElseThrow(NoteNotFoundException::new);

		note.edit(requestDto.title(), requestDto.content(), NoteType.valueOf(requestDto.noteType()), NoteVisibility.valueOf(requestDto.noteVisibility()));

		// eventPublisher.publishEvent();
	}

	public void deleteNote(DeleteNoteRequestDto requestDto) {
		if (!noteRepository.existsByNoteIdAndUser(requestDto.noteId(), null)) { // todo: null -> user
			throw new NoteAccessDeniedException();
		}

		noteRepository.deleteById(requestDto.noteId());
	}
}
