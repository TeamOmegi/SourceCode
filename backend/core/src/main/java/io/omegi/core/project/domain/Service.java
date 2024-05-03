package io.omegi.core.project.domain;

import static jakarta.persistence.FetchType.*;
import static lombok.AccessLevel.*;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "service")
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Service {

	@Id
	@GeneratedValue
	private Integer serviceId;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "project_id")
	private Project project;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "service_type_id")
	private ServiceType serviceType;

	private String name;

	@CreatedDate
	private LocalDateTime createdAt;

	@LastModifiedDate
	private LocalDateTime updatedAt;
}
