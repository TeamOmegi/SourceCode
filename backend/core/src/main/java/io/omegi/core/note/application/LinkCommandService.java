package io.omegi.core.note.application;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.omegi.core.note.application.dto.request.LinkNotesRequestDto;
import io.omegi.core.note.application.dto.request.UnlinkNotesRequestDto;
import io.omegi.core.note.application.exception.LinkAlreadyExistsException;
import io.omegi.core.note.application.exception.NoteNotFoundException;
import io.omegi.core.note.domain.Link;
import io.omegi.core.note.domain.Note;
import io.omegi.core.note.persistence.LinkRepository;
import io.omegi.core.note.persistence.NoteRepository;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class LinkCommandService {

	private final LinkRepository linkRepository;
	private final NoteRepository noteRepository;

	public void linkNotes(LinkNotesRequestDto requestDto) {
		Note note = noteRepository.findById(requestDto.noteId())
			.orElseThrow(NoteNotFoundException::new);

		for (Integer targetNoteId : requestDto.targetNoteIds()) {
			Note targetNote = noteRepository.findById(targetNoteId)
				.orElseThrow(NoteNotFoundException::new);

			if (note.isLinkedTo(targetNote)) {
				throw new LinkAlreadyExistsException();
			}

			Link link = Link.builder()
				.note(note)
				.linkedNote(targetNote)
				.build();

			linkRepository.save(link);
		}
	}

	public void unlinkNote(UnlinkNotesRequestDto requestDto) {
		Note note = noteRepository.findById(requestDto.noteId())
			.orElseThrow(NoteNotFoundException::new);

		for (Integer linkedNoteId : requestDto.linkedNoteIds()) { // todo: 하나씩 조회해서 삭제하는 비효율 개선
			Note linkedNote = noteRepository.findById(linkedNoteId)
				.orElseThrow(NoteNotFoundException::new);

			if (!note.isLinkedTo(linkedNote)) {
				throw new RuntimeException(); // todo
			}

			linkRepository.deleteByLinkedNote(linkedNote);
		}
	}
}
