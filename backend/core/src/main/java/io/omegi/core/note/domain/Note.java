package io.omegi.core.note.domain;

import static jakarta.persistence.EnumType.*;
import static jakarta.persistence.FetchType.*;
import static lombok.AccessLevel.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import io.omegi.core.project.domain.Error;
import io.omegi.core.user.domain.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.SecondaryTable;
import jakarta.persistence.SecondaryTables;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "note")
@SecondaryTables({
	@SecondaryTable(name = "note_type", pkJoinColumns = @PrimaryKeyJoinColumn(name = "note_type_id")),
	@SecondaryTable(name = "note_visibility", pkJoinColumns = @PrimaryKeyJoinColumn(name = "note_visibility_id"))
})
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Note {

	@Id
	@GeneratedValue
	private Integer noteId;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	private String title;

	private String content;

	@OneToMany(mappedBy = "note")
	List<NoteTag> noteTags = new ArrayList<>();

	@Column(table = "note_type")
	@Enumerated(STRING)
	private NoteType type;

	@Column(table = "note_visibility")
	@Enumerated(STRING)
	private NoteVisibility visibility;

	@CreatedDate
	private LocalDateTime createdAt;

	@LastModifiedDate
	private LocalDateTime updatedAt;

	private Integer backlinkCount;

	@OneToMany(mappedBy = "note")
	private final Collection<Link> links = new HashSet<>();

	@OneToOne(fetch = LAZY, mappedBy = "note")
	private Error error;

	@Builder
	private Note(String title, String content, NoteType type, NoteVisibility visibility) {
		this.title = title;
		this.content = content;
		this.type = type;
		this.visibility = visibility;
		this.backlinkCount = 0;
	}

	public void edit(String title, String content, NoteType type, NoteVisibility visibility) {
		this.title = title;
		this.content = content;
		this.type = type;
		this.visibility = visibility;
	}

	public boolean isLinkedTo(Note note) {
		return links.stream()
			.map(Link::getLinkedNote)
			.anyMatch(n -> n.getNoteId().equals(note.getNoteId()));
	}

	public boolean isPublic() {
		return NoteVisibility.PUBLIC == this.visibility;
	}
}