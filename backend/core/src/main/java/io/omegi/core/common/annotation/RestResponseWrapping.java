package io.omegi.core.common.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import io.omegi.core.common.presentation.response.RestResponseStatus;

@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface RestResponseWrapping {

	int code();

	String message() default "";

	RestResponseStatus status();
}
