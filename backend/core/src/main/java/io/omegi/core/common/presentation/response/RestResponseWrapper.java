package io.omegi.core.common.presentation.response;

import static lombok.AccessLevel.*;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = PRIVATE)
public class RestResponseWrapper<T> implements ResponseWrapper<T> {

	private final Integer status;
	private final String message;
	private final T response;

	public static <T> RestResponseWrapper<T> from(T response, RestResponseStatus status) {
		return new RestResponseWrapper<>(status.getCode(), status.getMessage(), response);
	}

	public static <T> RestResponseWrapper<T> from(T response, int code, String message) {
		return new RestResponseWrapper<>(code, message, response);
	}
}
