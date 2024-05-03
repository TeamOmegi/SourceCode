package io.omegi.core.common.presentation.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum RestResponseStatus {

	SUCCESS(2000, "Process Success"),
	CLIENT_ERROR(4000, "Client Error"),
	SERVER_ERROR(5000, "Server Error");

	private final int code;
	private final String message;
}
