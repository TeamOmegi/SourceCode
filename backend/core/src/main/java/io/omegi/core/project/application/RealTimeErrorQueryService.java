package io.omegi.core.project.application;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import io.omegi.core.common.presentation.sse.SseEmitterManager;
import io.omegi.core.project.application.dto.request.SubscribeErrorsRequestDto;
import io.omegi.core.project.application.dto.request.UnsubscribeErrorsRequestDto;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class RealTimeErrorQueryService {

	private final SseEmitterManager sseEmitterManager;

	public SseEmitter subscribeErrors(SubscribeErrorsRequestDto requestDto) {
		return sseEmitterManager.create(requestDto.userId());
	}

	public void unsubscribeErrors(UnsubscribeErrorsRequestDto requestDto) {
		sseEmitterManager.complete(requestDto.userId());
	}
}
