package io.omegi.core.note.presentation.controller;

import static org.springframework.http.HttpStatus.*;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.omegi.core.note.application.NoteCommandService;
import io.omegi.core.note.application.dto.request.DeleteNoteRequestDto;
import io.omegi.core.note.application.dto.request.EditNoteRequestDto;
import io.omegi.core.note.application.dto.request.SaveNoteRequestDto;
import io.omegi.core.note.presentation.model.mapper.EditNoteRequestDtoMapper;
import io.omegi.core.note.presentation.model.mapper.SaveNoteRequestDtoMapper;
import io.omegi.core.note.presentation.model.request.EditNoteRequest;
import io.omegi.core.note.presentation.model.request.SaveNoteRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/notes")
@RequiredArgsConstructor
public class NoteController {

	private final NoteCommandService noteCommandService;

	@PostMapping("/")
	@ResponseStatus(CREATED)
	public void saveNote(@RequestBody SaveNoteRequest request) {
		SaveNoteRequestDto requestDto = SaveNoteRequestDtoMapper.INSTANCE.toTarget(request);
		noteCommandService.saveNote(requestDto);
	}

	@PatchMapping("/{noteId}")
	@ResponseStatus(OK)
	public void editNote(@PathVariable Integer noteId, @RequestBody EditNoteRequest request) {
		if (request.noteId().equals(noteId)) { // todo: 검증 로직 분리
			
		}

		EditNoteRequestDto requestDto = EditNoteRequestDtoMapper.INSTANCE.toTarget(request);
		noteCommandService.editNote(requestDto);
	}

	@DeleteMapping("/{noteId}")
	@ResponseStatus(NO_CONTENT)
	public void deleteNote(@PathVariable Integer noteId) { // todo: userId
		DeleteNoteRequestDto requestDto = new DeleteNoteRequestDto(null, noteId); // todo: userId
		noteCommandService.deleteNote(requestDto);
	}
}
