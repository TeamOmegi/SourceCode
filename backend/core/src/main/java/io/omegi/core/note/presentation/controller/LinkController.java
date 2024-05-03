package io.omegi.core.note.presentation.controller;

import static org.springframework.http.HttpStatus.*;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.omegi.core.note.application.LinkCommandService;
import io.omegi.core.note.application.dto.request.LinkNotesRequestDto;
import io.omegi.core.note.application.dto.request.UnlinkNotesRequestDto;
import io.omegi.core.note.presentation.model.request.LinkNoteRequest;
import io.omegi.core.note.presentation.model.request.UnlinkNoteRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/notes/link")
@RequiredArgsConstructor
public class LinkController {

	private final LinkCommandService linkCommandService;

	@PostMapping("/")
	@ResponseStatus(CREATED)
	public void linkNote(@RequestBody LinkNoteRequest request) { // todo : userId, noteId 검증
		LinkNotesRequestDto requestDto = new LinkNotesRequestDto(request.noteId(), List.of(request.targetNoteId()));
		linkCommandService.linkNotes(requestDto);
	}

	@DeleteMapping("/")
	@ResponseStatus(NO_CONTENT)
	public void unlinkNote(@RequestBody UnlinkNoteRequest request) {
		UnlinkNotesRequestDto requestDto = new UnlinkNotesRequestDto(request.noteId(), List.of(request.targetNoteId()));
		linkCommandService.unlinkNote(requestDto);
	}
}
