package io.omegi.core.note.presentation.controller;

import static org.springframework.http.HttpStatus.*;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.omegi.core.note.application.NoteQueryService;
import io.omegi.core.note.application.dto.request.NoteDetailRequestDto;
import io.omegi.core.note.application.dto.response.NoteDetailResponseDto;
import io.omegi.core.note.presentation.model.response.DrawNoteDetailViewResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/notes")
@RequiredArgsConstructor
public class NoteUiController {

	private final NoteQueryService noteQueryService;

	@GetMapping("/{noteId}")
	@ResponseStatus(OK)
	public DrawNoteDetailViewResponse drawNoteDetailView(@PathVariable Integer noteId) {
		NoteDetailRequestDto requestDto = new NoteDetailRequestDto(null, noteId);
		NoteDetailResponseDto responseDto = noteQueryService.queryNote(requestDto);
		return null; // todo
	}
}
