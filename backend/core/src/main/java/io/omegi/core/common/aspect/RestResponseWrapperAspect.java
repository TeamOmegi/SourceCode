package io.omegi.core.common.aspect;

import java.lang.reflect.Method;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;

import io.omegi.core.common.annotation.RestResponseWrapping;
import io.omegi.core.common.presentation.response.ResponseWrapper;
import io.omegi.core.common.presentation.response.RestResponseStatus;
import io.omegi.core.common.presentation.response.RestResponseWrapper;

@Aspect
public class RestResponseWrapperAspect {

	@Around("@annotation(io.omegi.core.common.annotation.RestResponseWrapping)")
	public ResponseWrapper<?> wrap(ProceedingJoinPoint joinPoint) throws Throwable {
		Object response = joinPoint.proceed();

		MethodSignature signature = (MethodSignature) joinPoint.getSignature();
		Method method = signature.getMethod();
		RestResponseWrapping restResponseWrapping = method.getAnnotation(RestResponseWrapping.class);

		RestResponseStatus status = restResponseWrapping.status();

		if (status == null) {
			int code = restResponseWrapping.code();
			String message = restResponseWrapping.message();
			return RestResponseWrapper.from(response, code, message);
		}

		return RestResponseWrapper.from(response, status);
	}
}
