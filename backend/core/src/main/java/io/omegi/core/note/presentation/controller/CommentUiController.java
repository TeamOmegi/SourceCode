package io.omegi.core.note.presentation.controller;

import static org.springframework.http.HttpStatus.*;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.omegi.core.note.application.CommentQueryService;
import io.omegi.core.note.presentation.model.response.DrawCommentsViewResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/notes/{noteId}/comments")
@RequiredArgsConstructor
public class CommentUiController {

	private final CommentQueryService commentQueryService;

	@GetMapping("/")
	@ResponseStatus(OK)
	public DrawCommentsViewResponse drawCommentsView(@PathVariable Integer noteId) {
		return commentQueryService.drawCommentsView(noteId);
	}
}
