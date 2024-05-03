package io.omegi.core.project.presentation.controller;

import static org.springframework.http.HttpStatus.*;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.omegi.core.common.annotation.Login;
import io.omegi.core.project.application.ErrorQueryService;
import io.omegi.core.project.presentation.model.response.DrawErrorDetailViewResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/errors")
@RequiredArgsConstructor
public class ErrorUiController {

	private final ErrorQueryService errorQueryService;

	@GetMapping("/{errorId}")
	@ResponseStatus(OK)
	public DrawErrorDetailViewResponse drawErrorDetailView(@Login Integer userId, @PathVariable Integer errorId) {
		return errorQueryService.drawErrorDetailView(userId, errorId);
	}
}
