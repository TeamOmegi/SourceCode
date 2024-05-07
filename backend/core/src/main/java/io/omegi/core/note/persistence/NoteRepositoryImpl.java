package io.omegi.core.note.persistence;

import java.util.List;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;

import io.omegi.core.note.domain.Note;
import io.omegi.core.note.domain.QNote;
import io.omegi.core.note.domain.QNoteTag;
import io.omegi.core.user.domain.User;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class NoteRepositoryImpl implements CustomNoteRepository {

	private final JPAQueryFactory queryFactory;

	@Override
	public List<Note> searchMyNotes(User user, String keyword, String tagName) {
		QNote note = QNote.note;
		QNoteTag noteTag = QNoteTag.noteTag;

		BooleanExpression titleLike = keyword == null ? null : note.title.contains(keyword);
		// BooleanExpression contentLike = keyword == null ? null : note.content.contains(keyword);
		BooleanExpression tagEq = tagName == null ? null : noteTag.tag.name.eq(tagName);

		return queryFactory.selectFrom(note)
			.join(note.noteTags, noteTag)
			.where(note.user.eq(user), titleLike, tagEq)
			.orderBy(note.createdAt.desc())
			.fetch();
	}

	@Override
	public List<Note> searchAllNotes(String keyword) {
		QNote note = QNote.note;
		BooleanExpression titleLike = keyword == null ? null : note.title.contains(keyword);

		return queryFactory.selectFrom(note)
			.where(titleLike)
			.orderBy(note.createdAt.desc())
			.fetch();
	}
}
