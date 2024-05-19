package io.omegi.core.project.persistence;

import java.util.List;

import io.omegi.core.project.domain.Error;

public interface CustomErrorRepository {

	List<Error> searchErrors(Integer userId, String projectName, String serviceName, Boolean solved, String errorType);
}
