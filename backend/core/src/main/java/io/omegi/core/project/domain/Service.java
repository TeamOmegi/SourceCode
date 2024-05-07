package io.omegi.core.project.domain;

import static jakarta.persistence.FetchType.*;
import static lombok.AccessLevel.*;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

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

	@OneToOne(fetch = LAZY)
	@JoinColumn(name = "service_token_id")
	private ServiceToken serviceToken;

	private String name;

	@CreatedDate
	private LocalDateTime createdAt;

	@LastModifiedDate
	private LocalDateTime updatedAt;

	public void registerServiceToken(ServiceToken serviceToken) {
		this.serviceToken = serviceToken;
	}
}
