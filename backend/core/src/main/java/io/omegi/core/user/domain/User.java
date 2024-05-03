package io.omegi.core.user.domain;

import static lombok.AccessLevel.*;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user")
@Getter
@NoArgsConstructor(access = PROTECTED)
public class User {

	@Id
	@GeneratedValue
	private Integer userId;

	private String username;

	private String repositoryToken;
	private String repositoryUrl;
	private String profileImageUrl;

	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;

	private boolean deleted;
}
